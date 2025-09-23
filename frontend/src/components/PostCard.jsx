import React, { useState } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import CommentCard from "./CommentCard";

const defImg = "image.png";

const PostCard = ({ post, navigate, timeAgo }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleLike = (e) => {
    e.currentTarget.classList.toggle("text-red-500");
    e.currentTarget.classList.toggle("text-gray-500");
    // Add like logic here if needed
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center cursor-pointer justify-between">
        <div
          onClick={() => navigate(`/load-profile?id=${post.userId}`)}
          className="flex items-center space-x-3"
        >
          <img
            src={post.pic || defImg}
            alt={`${post.username} avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.username || "Aayush"}
            </h3>
            <p className="text-sm text-gray-500">{post.timeAgo}</p>
          </div>
        </div>
        <div className="ago">
          <span>{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed">{post.desc}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div
          className="image cursor-pointer"
          onClick={() => navigate(`/post?id=${post._id}`)}
        >
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-3 items-center space-x-4">
            <button
              onClick={toggleLike}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
            >
              <Heart size={20} className="text-gray-500" />
              <span className="text-sm">{post.likes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
            >
              <MessageCircle size={20} />
              <span className="text-sm">{post.comments.length}</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
              <Share size={20} />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex items-center space-x-2 mt-3">
          <img
            src={defImg}
            alt="Your avatar"
            className="w-8 h-8 rounded-full"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Comments */}
        {showComments && (
          <div className="commentsection flex flex-col space-y-4 mt-4">
            {post.comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                navigate={navigate}
                timeAgo={timeAgo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
