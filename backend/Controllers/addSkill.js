const UserModel = require("../Models/User");

const addSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    const email = req.user.email;

    if (!email || !skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Email and a non-empty array of skills are required.",
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Add only those skills that aren't already in the user's skills array
    const newSkills = skills.filter((skill) => !user.skills.includes(skill));

    if (newSkills.length === 0) {
      return res.status(409).json({
        success: false,
        message: "All provided skills already exist for this user.",
      });
    }

    user.skills.push(...newSkills);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Skills added successfully.",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not add skills.",
    });
  }
};

// Controller to find users by skills and return their emails
const findUserSk = async (req, res) => {
  try {
    const { skills } = req.body;

    // Proper validation for the skills array
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "An array of skills is required.",
      });
    }

    // Find users that have any skill in the given skills array
    const users = await UserModel.find({
      skills: { $in: skills },
    }).select("email -_id"); // select only 'email', exclude '_id'

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found with the required skills.",
      });
    }

    // Extract emails from found users
    const emails = users.map((user) => user.email);

    return res.status(200).json({
      success: true,
      message: "Users found with matching skills.",
      emails: emails,
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
