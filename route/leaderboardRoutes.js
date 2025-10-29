import express from "express";
import { getLeaderboardWithUserRank } from "../controller/leaderboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getLeaderboardWithUserRank);

export default router;
