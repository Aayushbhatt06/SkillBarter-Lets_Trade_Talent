const contriModel = require("../Models/Proj_Contri");
const projectModel = require("../Models/projects");

const sendContriReq = async (req, res) => {
  try {
    const { projId } = req.body;
    const userId = req.user._id;

    if (!projId) {
      return res.status(400).json({
        message: "Project ID not provided",
        success: false,
      });
    }

    const project = await projectModel.findById(projId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    const existingReq = await contriModel.findOne({
      user: userId,
      proj: projId,
    });

    if (existingReq) {
      return res.status(409).json({
        message: "Contribution request already exists",
        success: false,
      });
    }

    const newContribution = await contriModel.create({
      user: userId,
      proj: projId,
      status: "pending",
    });

    return res.status(201).json({
      message: "Successfully requested for contribution",
      success: true,
      data: newContribution,
    });
  } catch (error) {
    console.error("Contribution request error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const acceptContribution = async (req,res)=>{
    
}

module.exports = { sendContriReq };
