import mongoose from "mongoose";
import moment from "moment";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { 
    type: Date, 
    required: true,
    get: (dob) => moment(dob).format("DD-MM-YYYY"),  // Format when retrieving
    set: (dob) => moment(dob, "DD-MM-YYYY").toDate() // Convert when saving
  },
  phoneNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true }, toObject: { getters: true } }); // Ensure get() runs when converting to JSON

const User = mongoose.model("User", userSchema);

export default User;
