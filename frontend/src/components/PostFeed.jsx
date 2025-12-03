import React, { useState } from "react";
import PostCard from "./PostCard";
import InstantPost from "./InstantPost";
import { useNavigate } from "react-router-dom";
import { sendConnection } from "./SendConnection";

const PostFeed = ({ posts, setPosts }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    return `${months} months ago`;
  };

  const handleConnection = async (receiverId) => {
    try {
      const res = await sendConnection(receiverId);

      if (res.ok) {
        setError(false);
        setMessage(res.data?.message || "Connection request sent");
      } else {
        setError(true);
        setMessage(res.data?.message || "Failed to send request");
      }
    } catch (err) {
      setError(true);
      setMessage("Something went wrong");
    }

    setTimeout(() => {
      setMessage("");
      setError(false);
    }, 4000);
  };

  return (
    <>
      {message && (
        <div className="status flex">
          <div
            className={`${
              error ? "bg-red-400" : "bg-green-400"
            } text-white p-4 w-full h-[10vh] mx-5 mt-3 rounded-xl flex items-center justify-center font-semibold transition-all`}
          >
            {message}
          </div>
        </div>
      )}

      <div className="flex-1 px-6 py-4 max-w-[40vw]">
        <InstantPost setPosts={setPosts} />

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              setPosts={setPosts}
              post={post}
              navigate={navigate}
              timeAgo={timeAgo}
              onConnect={handleConnection}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostFeed;
