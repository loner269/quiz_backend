import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/QuestionModel.js";
import fs from "fs";

dotenv.config();

console.log("✅ Loaded .env file");
console.log("🔍 MONGO_URI from env:", process.env.MONGODB_URL);

const seedDatabase = async () => {
  try {
    console.log("⏳ Attempting MongoDB connection...");
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("✅ Connected to MongoDB");
    const data = JSON.parse(
      fs.readFileSync("./data/quiz_seed_data.json", "utf-8")
    );
    await Question.deleteMany(); 
    await Question.insertMany(data);

    console.log(`🌱 Seeded ${data.length} HTML questions successfully`);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
