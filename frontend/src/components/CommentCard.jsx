import React from "react";
const defImg = "image.png";

const CommentCard = ({ comment, navigate, timeAgo }) => (
  <div className="bg-white p-2 rounded-lg border flex flex-col border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between">
      <div
        onClick={() => navigate(`/load-profile?id=${comment.userId}`)}
        className="flex items-center space-x-3 cursor-pointer"
      >
        <img
          className="rounded-full w-10 h-10 object-cover"
          src={comment.pic || defImg}
          alt={comment.username || "Anonymous User"}
        />
        <span className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
          {comment.username || "Anonymous User"}
        </span>
      </div>
      <div className="createdAt">{timeAgo(comment.createdAt)}</div>
    </div>
    <hr />
    <div className="mt-2 text-gray-700 mx-4 mb-2 text-sm">{comment.text}</div>
  </div>
);

export default CommentCard;
