import mongoose from "mongoose";

const clusterResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clusterId: { type: Number, required: true },
  recommendations: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const ClusterResult = mongoose.model("ClusterResult", clusterResultSchema);

export default ClusterResult;
