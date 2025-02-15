import express from "express";
import { submitHealthProfile } from "../controllers/healthProfileController.js";

const router = express.Router();

// Submit health profile
router.post("/submit", submitHealthProfile);

export default router;
