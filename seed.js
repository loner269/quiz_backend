import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/QuestionModel.js";
import { htmlQuestions } from "./data/htmlQuestions.js";

dotenv.config();

console.log("✅ Loaded .env file");
console.log("🔍 MONGO_URI from env:", process.env.MONGODB_URL);

const seedDatabase = async () => {
  try {
    console.log("⏳ Attempting MongoDB connection...");
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    await Question.deleteMany({ category: "HTML" });
    await Question.insertMany(htmlQuestions);

    console.log(
      `🌱 Seeded ${htmlQuestions.length} HTML questions successfully`
    );
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
