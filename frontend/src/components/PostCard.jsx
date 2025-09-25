import React, { useState } from "react";
import { Heart, MessageCircle, Share, ClipboardCheck } from "lucide-react";
import CommentCard from "./CommentCard";
import { useSelector } from "react-redux";

const defImg = "image.png";

const PostCard = ({ post, navigate, timeAgo, setPosts }) => {
  const user = useSelector((state) => state.user);

  const [showComments, setShowComments] = useState(false);
  const [shareLogo, SetShareLogo] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newCommentAdd, setNewCommentAdd] = useState({
    userId: user.id,
    userName: user.name,
    text: newComment,
    pic: user.image,
    createdAt: Date.now(),
  });

  const toggleLike = (e) => {
    e.currentTarget.classList.toggle("text-red-500");
    e.currentTarget.classList.toggle("text-gray-500");
  };

  const handleNewComment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment, postId: post._id }),
        }
      );
      if (!res.ok) {
        alert("error");
      }
      const data = await res.json();
      const updatedPost = data.post;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      setNewComment("");
    } catch (error) {
      alert(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post._id }),
      });
      if (!res.ok) {
        console.log("error Occured while Like");
      }
      const data = await res.json();
      const updatedPost = data.updatedPost;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BACKEND_URL}/api/load-post?postId=${post._id}`
    );

    SetShareLogo(true);
    setTimeout(() => {
      SetShareLogo(false);
    }, 5000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-center  justify-between">
        <div
          onClick={() => navigate(`/load-profile?id=${post.userId}`)}
          className="flex items-center cursor-pointer space-x-3"
        >
          <img
            src={post.pic || defImg}
            alt={`${post.username} avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.username || "Anonymous"}
            </h3>
            <p className="text-sm text-gray-500">{post.timeAgo}</p>
          </div>
        </div>
        <div className="ago">
          <span>{timeAgo(post.createdAt)}</span>
        </div>
      </div>
      <div className="px-4 pb-3">
        <h6>{post.title}</h6>
        <p className="text-gray-800 leading-relaxed">{post.desc}</p>
      </div>
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
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-3 items-center space-x-4">
            <div className="likes gap-1 flex">
              <button
                onClick={(e) => {
                  toggleLike(e);
                  handleLike();
                }}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
              >
                <Heart size={20} />
              </button>
              <span className="text-sm">{post.likes.length}</span>
            </div>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
            >
              <MessageCircle size={20} />
              <span className="text-sm">{post.comments.length}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-500"
            >
              {shareLogo ? <ClipboardCheck /> : <Share size={20} />}
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          <img
            src={defImg}
            alt="Your avatar"
            className="w-8 h-8 rounded-full"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newComment.trim() !== "") {
                handleNewComment();
                setShowComments(true);
                e.preventDefault();
              }
            }}
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-3 mx-2 py-1 bg-red-500 text-white rounded"
            onClick={() => {
              handleNewComment();
              setShowComments(true);
            }}
          >
            comment
          </button>
        </div>

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
