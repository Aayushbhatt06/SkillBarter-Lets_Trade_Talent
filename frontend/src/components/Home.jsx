import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, MessageSquare, User, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
import InstantPost from "./InstantPost";
import PostCard from "./PostCard";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

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

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/fetchposts", {
        method: "GET",
      });
      if (!res.ok) {
        alert("unable to fetch posts");
      }
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();

        const userPayload = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
          skills: data.user.skills || [],
        };

        dispatch(login(userPayload));
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-300 min-h-[97vh]">
      <div className="container mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen sticky top-0 border-r border-gray-200 p-4">
          <nav className="space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-slate-50 rounded-lg font-medium"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <MessageSquare size={20} />
              <span>Messages</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Quick Stats</h3>
            <div className="text-sm text-blue-600">
              <p>Skills Shared: 15</p>
              <p>Projects Joined: 3</p>
              <p>Connections: 42</p>
            </div>
          </div>
        </div>

        {/* Feed */}
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
      </div>
    </div>
  );
};

export default HomePage;
