const mongoose = require("mongoose");

const contriSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proj: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
contriSchema.index({ user: 1, proj: 1 }, { unique: true });

module.exports = mongoose.model("Contribution", contriSchema);
