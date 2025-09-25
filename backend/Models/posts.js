const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // who commented
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  pic: { type: String },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = mongoose.model("Post", postSchema);
