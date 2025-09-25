const projectModel = require('../Models/projects');
const UserModel = require('../Models/User');

const addProject = async (req, res) => {
    try {
        const { name, requiredSkills, description } = req.body;
        const userId = req.user._id;

        if (!name || !requiredSkills || !description || !userId) {
            return res.status(400).json({
                success: false,
                message: "name, required skills, description, and userId are required."
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const newProj = new projectModel({
            userId,
            name,
            requiredSkills,
            description,
            fulfilled: false,
            createdAt: new Date()
        });

        await newProj.save();

        return res.status(201).json({
            success: true,
            message: "Project added successfully.",
            data: newProj
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error while adding project."
        });
    }
};

module.exports = addProject;
