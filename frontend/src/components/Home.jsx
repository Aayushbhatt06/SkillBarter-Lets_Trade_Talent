import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
import PostFeed from "./PostFeed";
import ProjectFeed from "./ProjectFeed";
import { socket } from "../../utils/Socket";

const HomePage = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/fetchposts`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        alert("unable to fetch posts");
      }
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  }, []);

  useEffect(() => {
    fetchPosts();
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("userOnline", (data) => {
      console.log("userOnline", data);
    });

    return () => {
      socket.off("connect");
      socket.off("userOnline");
      // socket.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={`${
          loading ? "flex" : "hidden"
        } flex-col justify-center items-center fixed inset-0 bg-white/70 backdrop-blur-sm z-50`}
      >
        <img className="w-20 h-20" src="Spinner.gif" alt="Loading..." />
        <p className="text-gray-700 mt-2 font-semibold">Loading...</p>
      </div>
      <div className="bg-gray-300 min-h-screen">
        <div className="container mx-auto flex max-w-7xl">
          <PostFeed className="hidden" posts={posts} setPosts={setPosts} />
          <ProjectFeed />
        </div>
      </div>
    </>
  );
};

export default HomePage;
