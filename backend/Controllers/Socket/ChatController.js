const messageDb = require("../../Models/messages");

const loadMessages = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    const roomId = [id.toString(), userId.toString()].sort().join("@");

    const chats = await messageDb.find({ roomId }).sort({ createdAt: 1 });

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

    const roomId = [id.toString(), userId.toString()].sort().join("@");

    const chat = await messageDb.create({
      roomId,
      sender: userId,
      message: text,
    });

    return res.status(200).json({
      message: "Message Sent Successfully",
      success: true,
      chat,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { newMessage, loadMessages };
