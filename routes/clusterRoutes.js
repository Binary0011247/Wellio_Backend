import express from "express";
import { runClustering, getRecommendations } from "../controllers/clusterController.js";

const router = express.Router();

// Run clustering and get recommendations
router.post("/run-clustering", runClustering);

// Get recommendations for a user
router.get("/recommendations/:userId", getRecommendations);

export default router;
