const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    roomId: { type: String, required: true, unique: true, index: true },
    fulfilled: { type: Boolean, default: false },
    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: Date, default: Date.now },
    unreadCounts: { type: Map, of: Number },
  },
  { timestamps: true }
);

connectionSchema.index({ users: 1 });

module.exports = mongoose.model("Connection", connectionSchema);
