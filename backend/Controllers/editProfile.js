const userModel = require("../Models/User");

const editProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, bio, image, skills } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.image = image || user.image;   

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = editProfile;
