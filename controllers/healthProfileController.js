import HealthProfile from "../models/HealthProfile.js";

export const submitHealthProfile = async (req, res) => {
  try {
    const healthProfile = new HealthProfile(req.body);
    await healthProfile.save();
    res.status(201).json(healthProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
