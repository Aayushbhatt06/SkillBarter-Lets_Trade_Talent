const postModel = require("../Models/posts");

const addPost = async (req, res) => {
    try {
        const { title, desc, image } = req.body;
        const userId = req.user._id;
        if (!title || !desc || !userId) {
            return res.status(401).json({
                message: "title, description are compulsory",
                success: true,
            });
        }
        if (!image) {
            image = null;
        }
        const post = new postModel({
            title,
            desc,
            image,
            userId,
            createdAt: new Date(),
        });

        await post.save();
        return res.status(200).json({
            message: "Post added Successfully",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server not responding",
            success: false,
        });
    }
};

const fetchPosts = async (req, res) => {
    try {
        let limit = 20;

        const randomPosts = await postModel.aggregate([
            { $sample: { size: limit } },
        ]);

        res.json({ success: true, posts: randomPosts });
    } catch (err) {
        res
            .status(500)
            .json({
                message: "server not responding",
                success: false,
                error: err.message,
            });
    }
};

const addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.user._id;

        if (!postId || !comment) {
            return res.status(400).json({
                message: "Post ID and comment are required",
                success: false,
            });
        }

        // Push new comment into the comments array
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        text: comment,
                        userId: userId,
                        createdAt: new Date(),
                    },
                },
            },
            { new: true } // return updated post
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Comment added successfully",
            success: true,
            post: updatedPost,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server not responding",
            success: false,
            error: err.message,
        });
    }
};

const like = async (req, res) => {
    try {
        const { postId } = req.body;
        if (!postId) {
            res.status(401).json({
                message: "Post Id is required",
                success: false,
            });
        }
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({
                message: "post no longer available",
                success: false
            })

        }
        return res.status(200).json({
            message: "Likes added successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server not responding",
            success: false
        })
    }
};

module.exports = {
    addPost,
    fetchPosts,
    addComment,
    like
};
