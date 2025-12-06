const messageDb = require("../../Models/messages");
const Connection = require("../../Models/Connection");
const { connection } = require("mongoose");

const getRoomId = (userA, userB) =>
  [userA.toString(), userB.toString()].sort().join("@");

const loadMessages = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    const roomId = getRoomId(id, userId);

    const chats = await messageDb
      .find({ roomId })
      .sort({ createdAt: 1 })
      .populate("sender", "name image _id");

    return res.status(200).json({
      message: "Messages fetched successfully",
      success: true,
      chats,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const newMessage = async (req, res) => {
  try {
    const { id, text } = req.body;
    const userId = req.user._id;

    if (!id || !text) {
      return res
        .status(400)
        .json({ success: false, message: "id and text are required" });
    }

    const roomId = getRoomId(id, userId);

    const existingConn = await Connection.findOne({ roomId });
    if (!existingConn) {
      return res.status(403).json({
        success: false,
        message: "Connection does not exist. Cannot send message.",
      });
    }

    const chat = await messageDb.create({
      roomId,
      sender: userId,
      message: text,
      readBy: [userId],
    });

    const otherUserId = id.toString();

    const conn = await Connection.findOneAndUpdate(
      { roomId },
      {
        $set: { lastMessage: text, lastMessageAt: new Date() },
        $inc: { [`unreadCounts.${otherUserId}`]: 1 },
        $setOnInsert: {
          users: [userId, otherUserId],
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Message Sent Successfully",
      success: true,
      chat,
      connection: conn,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { newMessage, loadMessages };
