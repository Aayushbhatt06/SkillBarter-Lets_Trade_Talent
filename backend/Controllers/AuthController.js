const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User Already Exists, Please Login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({ name, email, password: hashedPassword });

    const savedUser = await userModel.save();

    res.status(201).json({
      message: "Signup Successful",
      success: true,
      data: {
        _id: savedUser._id,
        name: savedUser.name,
        skills: savedUser.skills,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(201).json({
        message: "No user found with this Email",
        success: false,
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(201).json({
        message: "Password wrong",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        skills: user.skills,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server side error",
      success: false,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  signup,
  login,
  logout,
};
