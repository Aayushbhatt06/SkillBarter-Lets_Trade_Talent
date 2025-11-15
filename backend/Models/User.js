const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  password: { type: String, required: true },
  image: { type: String, default: "" },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
