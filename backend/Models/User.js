const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
