import express from "express";
import {
  saveResult,
  getUserResults,
  getBestResultsPerCategory,
  getLatestResultsPerCategory,
} from "../controller/resultController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, saveResult);
router.get("/my-results", protect, getUserResults);
router.get("/my-latest", protect, getLatestResultsPerCategory);
router.get("/my-best", protect, getBestResultsPerCategory);



export default router;
