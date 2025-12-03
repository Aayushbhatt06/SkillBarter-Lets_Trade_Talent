const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGO_CONN;

async function main() {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

main();
