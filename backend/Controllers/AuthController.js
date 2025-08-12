const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User Already Exists, Please Login",
                success: false
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
                createdAt: savedUser.createdAt
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server side error",
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                message: "Auth email or password is wrong",
                success: false
            });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({
                message: "Auth email or password is wrong",
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            "SECRET-123", // Use process.env.JWT_SECRET in production
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server side error",
            success: false
        });
    }
}

module.exports = {
    signup,
    login
};
