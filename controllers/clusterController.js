import HealthProfile from "../models/HealthProfile.js";
import ClusterResult from "../models/ClusterResult.js";
import { spawn } from "child_process";

export const runClustering = async (req, res) => {
  try {
    // Fetch all health profiles
    const healthProfiles = await HealthProfile.find();

    // Prepare data for clustering
    const data = healthProfiles.map((profile) => ({
      height: profile.height,
      weight: profile.weight,
      stressLevel: profile.stressLevel === "High" ? 2 : profile.stressLevel === "Medium" ? 1 : 0,
      sleepQuality: profile.sleepQuality === "Good" ? 2 : profile.sleepQuality === "Fair" ? 1 : 0,
      physicalActivity: profile.physicalActivity === "Daily" ? 2 : profile.physicalActivity === "Weekly" ? 1 : 0,
    }));

    // Run clustering using Python script
    const pythonProcess = spawn("python3", ["./utils/clustering.py", JSON.stringify(data)]);

    let clusters = "";
    pythonProcess.stdout.on("data", (data) => {
      clusters += data.toString();
    });

    pythonProcess.on("close", async () => {
      const clusterResults = JSON.parse(clusters);

      // Save cluster results to MongoDB
      for (let i = 0; i < healthProfiles.length; i++) {
        const clusterResult = new ClusterResult({
          userId: healthProfiles[i].userId,
          clusterId: clusterResults[i],
          recommendations: generateRecommendations(clusterResults[i]), // Use the renamed function
        });
        await clusterResult.save();
      }

      res.status(200).json({ message: "Clustering completed successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const clusterResult = await ClusterResult.findOne({ userId }).sort({ createdAt: -1 });
    res.status(200).json(clusterResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Helper function to generate recommendations based on cluster
const generateRecommendations = (clusterId) => {
  switch (clusterId) {
    case 0:
      return ["Practice yoga daily", "Drink 2 liters of water", "Sleep 7-8 hours"];
    case 1:
      return ["Eat a balanced diet", "Exercise 3-4 times a week", "Meditate daily"];
    case 2:
      return ["Consult a doctor for stress management", "Take breaks during work", "Get 8 hours of sleep"];
    default:
      return ["Maintain a healthy lifestyle"];
  }
};