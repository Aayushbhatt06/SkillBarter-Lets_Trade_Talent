const UserModel = require("../Models/User");

const addSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    const userId = req.user._id;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "skills is must be an array",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const newSkills = skills.filter((skill) => !user.skills.includes(skill));

    if (newSkills.length === 0) {
      return res.status(409).json({
        success: false,
        message: "Skills already Exists",
      });
    }

    user.skills.push(...newSkills);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Skills added successfully.",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not add skills.",
    });
  }
};

const findUserSk = async (req, res) => {
  try {
    let { search } = req.body;
    if (!search || (Array.isArray(search) && search.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Search input (word or array) is required.",
      });
    }
    if (!Array.isArray(search)) {
      search = [search]; 
    }

    const users = await UserModel.find({
      $or: [
        { skills: { $in: search } },
        { name: { $in: search.map((word) => new RegExp(word, "i")) } },
      ],
    }).select("name _id");

    if (!users || users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found with the given search.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users found.",
      users: users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while searching for users.",
    });
  }
};

module.exports = {
  addSkills,
  findUserSk,
};
