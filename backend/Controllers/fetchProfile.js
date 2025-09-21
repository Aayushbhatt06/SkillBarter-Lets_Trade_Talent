const UserModel = require("../Models/User");
const postModel = require("../Models/posts");
const projectModel = require("../Models/projects");

const fetchProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user
    const user = await UserModel.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch posts and projects
    const posts = await postModel.find({ userId }).lean(); // convert to plain JS objects
    const projects = await projectModel.find({ userId }).lean();

    return res.json({
      success: true,
      user: user.toObject(), // convert Mongoose doc to plain JS object
      posts,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = fetchProfile;
