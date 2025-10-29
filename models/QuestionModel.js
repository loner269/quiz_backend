import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advance'], required: true },
    category: { type: String, required: true },
});
const Question = mongoose.model('Question', questionSchema);


export default Question;
