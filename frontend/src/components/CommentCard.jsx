import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";

const defImg = "image.png";

const CommentCard = ({ comment, navigate, timeAgo }) => {
  // const [liked, setLiked] = useState(false);
  // const [disliked, setDisliked] = useState(false);
  // const [likesCount, setLikesCount] = useState(comment.likes || 0);

  // const handleLike = () => {
  //   if (!liked) {
  //     setLikesCount(likesCount + (disliked ? 2 : 1));
  //     setDisliked(false);
  //   } else {
  //     setLikesCount(likesCount - 1);
  //   }
  //   setLiked(!liked);
  // };

  // const handleDislike = () => {
  //   if (!disliked) {
  //     setLikesCount(likesCount - (liked ? 2 : 1));
  //     setLiked(false);
  //   } else {
  //     setLikesCount(likesCount + 1);
  //   }
  //   setDisliked(!disliked);
  // };

  return (
    
    <div className="flex gap-3 py-3">
      <img
        src={comment.pic || defImg}
        alt={comment.username || "Anonymous User"}
        className="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate(`/load-profile?id=${comment.userId}`)}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="font-medium text-sm text-gray-900 cursor-pointer hover:text-gray-700 transition"
            onClick={() => navigate(`/load-profile?id=${comment.userId}`)}
          >
            {comment.username || "Anonymous User"}
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed mb-2 break-words">
          {comment.text}
        </p>
        {/* <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-xs font-medium transition ${
              liked ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ThumbsUp size={14} className={liked ? "fill-current" : ""} />
            {likesCount > 0 && <span>{likesCount}</span>}
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 text-xs font-medium transition ${
              disliked ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ThumbsDown size={14} className={disliked ? "fill-current" : ""} />
          </button>
          <button className="text-xs font-medium text-gray-600 hover:text-gray-900 transition">
            Reply
          </button>
        </div> */}
      </div>
      <button className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0 transition">
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

export default CommentCard;
