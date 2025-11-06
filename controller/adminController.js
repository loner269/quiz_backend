import Question from "../models/QuestionModel.js";

export const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, difficulty, category } =
      req.body;
    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      difficulty,
      category,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer, difficulty, category } =
      req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, options, correctAnswer, difficulty, category },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};