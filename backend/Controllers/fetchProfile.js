const UserModel = require("../Models/User");
const postModel = require("../Models/posts");
const projectModel = require("../Models/projects");

const fetchProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const posts = await postModel.find({ userId }).sort({ createdAt: -1 });
    const projects = await projectModel
      .find({ userId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      user: user.toObject(),
      posts,
      projects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = fetchProfile;
