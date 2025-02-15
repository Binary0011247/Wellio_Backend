import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, dateOfBirth, phoneNumber } = req.body;
    const user = new User({ name, dateOfBirth, phoneNumber });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
