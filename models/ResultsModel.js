import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technology:{type:String, required: true},
    difficulty:{type:String, required: true},
    totalQuestions: { type: Number, required: true },
    answeredQuestions: { type: Number, required: true },
    skippedQuestions: { type: Number, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
const Result = mongoose.model('Result', resultSchema);

export default Result;

