import React from "react";
import PostCard from "./PostCard";
import InstantPost from "./InstantPost";
import { useNavigate } from "react-router-dom";

const PostFeed = ({ posts, setPosts }) => {
  const navigate = useNavigate();
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
  return (
    <div className="flex-1 px-6 py-4 max-w-2xl">
      <InstantPost setPosts={setPosts} />

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            setPosts={setPosts}
            post={post}
            navigate={navigate}
            timeAgo={timeAgo}
          />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
