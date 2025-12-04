const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PendingUser = require("../Models/PendingUser");
require("dotenv").config();

// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email and password are required",
//       });
//     }

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists, please login",
//       });
//     }
//     await PendingUser.deleteMany({ email });

//     const otp = Math.floor(100000 + Math.random() * 900000);

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const pendingUser = new PendingUser({
//       name,
//       email,
//       password: hashedPassword,
//       otp,
//     });

//     await pendingUser.save();

//     return res.status(201).json({
//       success: true,
//       message: "OTP sent successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Server side error",
//     });
//   }
// };

// const otpVerification = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and OTP are required",
//       });
//     }

//     const pending = await PendingUser.findOne({ email });

//     if (!pending) {
//       return res.status(400).json({
//         message: "There is no pending signup for this email",
//         success: false,
//       });
//     }
//     if (pending.otpExpires < Date.now()) {
//       await PendingUser.deleteOne({ _id: pending._id });

//       return res.status(400).json({
//         message: "OTP expired, please signup again",
//         success: false,
//       });
//     }
//     if (Number(otp) !== pending.otp) {
//       return res.status(400).json({
//         message: "Please enter correct OTP",
//         success: false,
//       });
//     }
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       await PendingUser.deleteOne({ _id: pending._id });

//       return res.status(409).json({
//         success: false,
//         message: "User already exists, please login",
//       });
//     }

//     await UserModel.create({
//       name: pending.name,
//       email: pending.email,
//       password: pending.password,
//     });

//     await PendingUser.deleteOne({ _id: pending._id });

//     return res.status(200).json({
//       message: "Signup successful",
//       success: true,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Something went wrong",
//       success: false,
//       error: err.message,
//     });
//   }
// };

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
      secure: true,
      sameSite: "none",
      path: "/",
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
    secure: true,
    path: "/",
    sameSite: "none",
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
