const postModel = require("../Models/posts");
const userModel = require("../Models/User");

const addPost = async (req, res) => {
  try {
    const { title, desc, image } = req.body;
    const userId = req.user._id;
    if (!title || !desc) {
      return res.status(401).json({
        message: "title, description are compulsory",
        success: true,
      });
    }
    if (!image) {
      image = null;
    }
    const post = new postModel({
      username: user.name,
      pic: user.image,
      title,
      desc,
      image,
      userId: user._id,
      createdAt: new Date(),
    });

    await post.save();
    return res.status(200).json({
      message: "Post added Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server not responding",
      success: false,
    });
  }
};

const fetchPosts = async (req, res) => {
  try {
    let limit = 20;

    const randomPosts = await postModel.aggregate([
      { $sample: { size: limit } },
    ]);

    res.json({ success: true, posts: randomPosts });
  } catch (err) {
    res.status(500).json({
      message: "server not responding",
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

    // Push new comment into the comments array
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            username: user.name,
            pic: user.image,
            text: comment,
            userId: user._id,
            createdAt: new Date(),
          },
        },
      },
      { new: true } // return updated post
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      post: updatedPost,
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
      return res.status(400).json({
        message: "Post Id is required",
        success: false,
      });
    }
    const user = await userModel.findById(userId);
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post no longer available",
        success: false,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (post.likes.some((id) => id.toString() === userId.toString())) {
      // Remove like
      user.likedPosts = user.likedPosts.filter(
        (id) => id.toString() !== postId.toString()
      );
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      await Promise.all([user.save(), post.save()]);

      return res.status(200).json({
        message: "Like removed",
        success: true,
        updatedPost: post,
      });
    }

    user.likedPosts.push(postId);

    post.likes.push(userId);
    await post.save();
    await user.save();

    return res.status(200).json({
      message: "Like added successfully",
      success: true,
      updatedPost: post,
    });
  } catch (err) {
    console.error("Like error:", err);
    return res.status(500).json({
      message: "Server not responding",
      success: false,
    });
  }
};

module.exports = {
  addPost,
  fetchPosts,
  addComment,
  like,
};
