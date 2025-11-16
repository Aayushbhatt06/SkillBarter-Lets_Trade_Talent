const connectionModel = require("../Models/Connection");
const userModel = require("../Models/User");

const conReq = async (req, res) => {
  try {
    const sendId = req.user._id.toString();
    const receiverId = req.body.receiverId;

    if (!receiverId) {
      return res.status(400).json({
        message: "receiverId is required",
        success: false,
      });
    }

    if (sendId === receiverId) {
      return res.status(400).json({
        message: "You cannot send a request to yourself",
        success: false,
      });
    }

    const user1 = await userModel.findById(sendId);
    const user2 = await userModel.findById(receiverId);

    if (!user1 || !user2) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const roomId = [sendId, receiverId].sort().join("@");
    const existing = await connectionModel.findOne({ roomId });

    if (existing) {
      if (existing.fulfilled) {
        return res.status(200).json({
          message: "Already connected",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "Request already pending",
          success: false,
        });
      }
    }

    await connectionModel.create({
      users: [sendId, receiverId],
      roomId,
      fulfilled: false,
    });

    return res.status(201).json({
      message: "Request sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Connection request error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const conReject = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const conId = req.body.conId;

    if (!conId) {
      return res.status(400).json({
        message: "conId is required",
        success: false,
      });
    }

    const connection = await connectionModel.findById(conId).lean();
    if (!connection) {
      return res.status(404).json({
        message: "Connection not found",
        success: false,
      });
    }
    if (connection.fulfilled) {
      return res.status(400).json({
        message: "There is no pending request to reject",
        success: false,
      });
    }

    const [senderId, receiverId] = connection.users.map(String);

    if (userId !== receiverId) {
      return res.status(403).json({
        message: "You are not authorized to reject this request",
        success: false,
      });
    }

    await connectionModel.findByIdAndDelete(conId);

    return res.status(200).json({
      message: "Request rejected",
      success: true,
    });
  } catch (error) {
    console.error("Connection request error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const conAccept = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const conId = req.body.conId;

    if (!conId) {
      return res.status(400).json({
        message: "ConId is required",
        success: false,
      });
    }

    const connection = await connectionModel.findById(conId);
    if (!connection) {
      return res.status(404).json({
        message: "Connection not found",
        success: false,
      });
    }

    if (connection.fulfilled) {
      return res.status(400).json({
        message: "Request already accepted",
        success: false,
      });
    }
    const [senderId, receiverId] = connection.users.map(String);

    if (userId !== receiverId) {
      return res.status(403).json({
        message: "You are not authorized to accept this request",
        success: false,
      });
    }

    connection.fulfilled = true;
    await connection.save();
    return res.status(200).json({
      message: "Request accepted",
      success: true,
    });
  } catch (error) {
    console.error("Connection request error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const fetchConReq = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({
        message: "Please Login",
        success: false,
      });
    }

    const connections = await connectionModel
      .find({ users: userId, fulfilled: false })
      .populate("users", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched Successfully",
      success: true,
      connections: connections,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

const fetchConnections = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({
        message: "Please Login",
        success: false,
      });
    }

    const connections = await connectionModel
      .find({ users: userId, fulfilled: true })
      .populate("users", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched Successfully",
      success: true,
      connections: connections,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  conReq,
  conReject,
  conAccept,
  fetchConReq,
  fetchConnections,
};
