const postModel = require("../Models/posts");
const userModel = require("../Models/User");
const Like = require("../Models/Like");
const Comment = require("../Models/Comments");
const { uploadToCloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

const addPost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const user = req.user;

    if (!title || !desc) {
      return res.status(400).json({
        message: "Title and description are required",
        success: false,
      });
    }

    let url;
    if (req.file) {
      const localFilePath = req.file.path;
      const result = await uploadToCloudinary(localFilePath);
      if (!result) {
        return res.status(500).json({ error: "Upload failed" });
      }
      url = result.secure_url;
    }

    const post = new postModel({
      username: user.name,
      pic: user.image,
      title,
      desc,
      image: url || null,
      userId: user._id,
      like: 0,
      createdAt: new Date(),
    });

    await post.save();

    return res.status(200).json({
      message: "Post added successfully",
      success: true,
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server not responding",
      success: false,
      error: err.message,
    });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const limit = 20;

    const posts = await postModel.aggregate([
      { $sample: { size: limit } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
    ]);

    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({
      message: "Server not responding",
      success: false,
      error: err.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const user = req.user;

    if (!postId || !comment) {
      return res.status(400).json({
        message: "Post ID and comment are required",
        success: false,
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const newComment = await Comment.create({
      postId,
      userId: user._id,
      username: user.name,
      text: comment,
      pic: user.image,
    });

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      post: {
        ...post.toObject(),
        comments,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server not responding",
      success: false,
      error: err.message,
    });
  }
};

const like = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.body;

    if (!postId) {
      return res
        .status(400)
        .json({ message: "Post Id is required", success: false });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      await existingLike.deleteOne();
      post.like = Math.max(post.like - 1, 0);
    } else {
      await Like.create({ userId, postId });
      post.like += 1;
    }

    await post.save();

    const updatedPost = await postModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
    ]);

    return res.status(200).json({
      message: existingLike ? "Like removed" : "Like added successfully",
      success: true,
      updatedPost: updatedPost[0],
    });
  } catch (err) {
    console.error("Like error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  addPost,
  fetchPosts,
  addComment,
  like,
};
