const projectDB = require("../Models/projects");
const userModel = require("../Models/User");

const fetchProjects = async (req, res) => {
  try {
    const { presentProjects = [] } = req.body;
    const id = req.user._id;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not found, Please Login",
        success: false,
      });
    }

    const skills = user.skills || [];
    let Skprojects = [];
    let Rnprojects = [];

    if (skills.length > 0) {
      Skprojects = await projectDB
        .find({
          requiredSkills: { $in: skills },
          _id: { $nin: presentProjects },
        })
        .populate("userId", "name email image skills")
        .limit(10);
    }

    const remaining = 10 - Skprojects.length;

    if (remaining > 0) {
      const excludeIds = [...presentProjects, ...Skprojects.map((p) => p._id)];

      const docs = await projectDB.aggregate([
        { $match: { _id: { $nin: excludeIds } } },
        { $sample: { size: remaining } },
      ]);

      Rnprojects = await projectDB.populate(docs, {
        path: "userId",
        select: "name email image skills",
      });
    }

    const projects = [...Skprojects, ...Rnprojects];

    return res.status(200).json({
      message: "Projects sent successfully",
      success: true,
      Projects: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

module.exports = fetchProjects;
