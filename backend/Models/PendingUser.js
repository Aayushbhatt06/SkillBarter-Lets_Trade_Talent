const mongoose = require("mongoose");
const { Schema } = mongoose;

const pendingUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: Number, required: true },
  otpExpires: {
    type: Date,
    required: true,
    default: () => Date.now() + 5 * 60 * 1000,
  },
});

const pendingUserModel = mongoose.model("pendingUser", pendingUserSchema);
module.exports = pendingUserModel;
