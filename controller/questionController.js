import Question from "../models/QuestionModel.js";


export const getQuestionsByCategoryAndDifficulty = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        const questions = await Question.find(filter);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


