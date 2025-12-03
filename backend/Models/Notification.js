const mongoose = require("mongoose");

const notificationScheema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: { type: String, enum: [req, accept, reject] },
  read: { type: Boolean, default: false },
});
