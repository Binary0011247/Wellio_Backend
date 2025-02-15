import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  hasMenstrualCycle: { type: Boolean, required: true },
  lastPeriodDate: { type: Date },
  periodDuration: { type: Number },
  periodSymptoms: { type: [String] },
  diagnosedConditions: { type: [String] },
  tryingToConceive: { type: Boolean },
  weeksPregnant: { type: Number },
  pregnancyComplications: { type: [String] },
  depressionAnxiety: { type: Boolean },
  moodSwings: { type: Boolean },
  stressLevel: { type: String },
  waterIntake: { type: String },
  sleepHours: { type: String },
  sleepQuality: { type: String },
  dietType: { type: String },
  fruitVeggieIntake: { type: String },
  physicalActivity: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const HealthProfile = mongoose.model("HealthProfile", healthProfileSchema);

export default HealthProfile;
