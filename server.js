import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import healthProfileRoutes from "./routes/healthProfileRoutes.js";
import clusterRoutes from "./routes/clusterRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/health-profile", healthProfileRoutes);
app.use("/api/cluster", clusterRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
