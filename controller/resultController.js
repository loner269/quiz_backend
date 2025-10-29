import Result from "../models/ResultsModel.js";
import User from "../models/UserModel.js";

export const saveResult = async (req, res) => {
  const { technology, difficulty, score, totalQuestions, answeredQuestions, skippeQuestions } = req.body;
  try {
    const result = await Result.create({
      user: req.user._id,
      technology,
      difficulty,
      score,
      totalQuestions,
      answeredQuestions,
      skippeQuestions
    });

    // update user's cumulative score
    const user = await User.findById(req.user._id);
    user.score += score;
    await user.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserResults = async (req, res) => {
  try {
    const { technology, difficulty, page = 1, limit = 10 } = req.query;
    const filters = { user: req.user._id };

    if (technology) filters.technology = technology;
    if (difficulty) filters.difficulty = difficulty;

    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      Result.find(filters)
        .populate("user", "username email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Result.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      currentPage: Number(page),
      totalPages,
      totalResults: total,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getLatestResultsPerCategory = async (req, res) => {
  try {
    const results = await Result.aggregate([
      { $match: { user: req.user._id } },
      {
        $sort: { date: -1 }, // sort newest first
      },
      {
        $group: {
          _id: { technology: "$technology", difficulty: "$difficulty" },
          latestResult: { $first: "$$ROOT" }, // take the first (latest)
        },
      },
      {
        $replaceRoot: { newRoot: "$latestResult" },
      },
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBestResultsPerCategory = async (req, res) => {
  try {
    const results = await Result.aggregate([
      { $match: { user: req.user._id } },
      {
        $sort: { score: -1, date: -1 }, // best first, then most recent
      },
      {
        $group: {
          _id: { technology: "$technology", difficulty: "$difficulty" },
          bestResult: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$bestResult" } },
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
