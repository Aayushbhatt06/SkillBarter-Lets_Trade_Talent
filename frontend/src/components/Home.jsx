import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
import PostFeed from "./PostFeed";
import ProjectFeed from "./ProjectFeed";

const HomePage = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
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
        <PostFeed className="hidden" posts={posts} setPosts={setPosts} />
        <ProjectFeed />
      </div>
    </div>
  );
};

export default HomePage;
