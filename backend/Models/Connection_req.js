const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConnectionSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: "user", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "user", required: true },
  roomId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

ConnectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });   

const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;
