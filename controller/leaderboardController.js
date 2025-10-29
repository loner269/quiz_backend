import Result from "../models/ResultsModel.js";
import User from "../models/UserModel.js";

export const getLeaderboardWithUserRank = async (req, res) => {
  try {
    const { technology, difficulty, limit = 10, mode = "total" } = req.query;
    const userId = req.user?._id; 
    const filters = {};
    if (technology) filters.technology = technology;
    if (difficulty) filters.difficulty = difficulty;

   
    let groupStage = {};
    if (mode === "best") {
      groupStage = { _id: "$user", score: { $max: "$score" } };
    } else if (mode === "average") {
      groupStage = { _id: "$user", score: { $avg: "$score" } };
    } else {
      groupStage = { _id: "$user", score: { $sum: "$score" } };
    }

    
    const leaderboard = await Result.aggregate([
      { $match: filters },
      { $group: groupStage },
      { $sort: { score: -1 } },
    ]);

    if (leaderboard.length === 0)
      return res.json({ leaderboard: [], userRank: null });

    
    const topUsers = leaderboard.slice(0, Number(limit));

    
    const userIds = topUsers.map((entry) => entry._id);
    const users = await User.find({ _id: { $in: userIds } })
      .select("username email")
      .lean();

    const leaderboardWithNames = topUsers.map((entry) => ({
      _id: entry._id,
      username:
        users.find((u) => u._id.toString() === entry._id.toString())
          ?.username || "Unknown",
      email:
        users.find((u) => u._id.toString() === entry._id.toString())?.email ||
        "",
      score: Math.round(entry.score),
    }));

    // --- USER RANK SECTION ---
    let userRankInfo = null;
    if (userId) {
      const userRankIndex = leaderboard.findIndex(
        (entry) => entry._id.toString() === userId.toString()
      );

      if (userRankIndex !== -1) {
        const totalUsers = leaderboard.length;
        const userRank = userRankIndex + 1;
        const percentile = ((totalUsers - userRank) / totalUsers) * 100;
        const userScore = leaderboard[userRankIndex].score;

        userRankInfo = {
          rank: userRank,
          totalUsers,
          percentile: Math.round(percentile * 10) / 10,
          score: Math.round(userScore),
        };
      }
    }

    res.json({
      technology: technology || "All",
      difficulty: difficulty || "All",
      mode,
      leaderboard: leaderboardWithNames,
      userRank: userRankInfo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
