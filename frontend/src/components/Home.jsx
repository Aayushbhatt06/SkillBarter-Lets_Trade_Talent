import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share,
  Home,
  MessageSquare,
  User,
  Bell,
  Settings,
  MoreHorizontal,
  Camera,
  Target,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import InstantPost from "./InstantPost";

const HomePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const defImg = "image.png";

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date; // difference in ms

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
  }

  //Fetch the posts from backend

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/fetchposts", {
        method: "GET",
      });
      if (!res.ok) {
        alert("unable to fetch posts");
      }
      const data = await res.json();
      await console.log(data.posts);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const like = async () => {};
  useEffect(() => {
    fetchPosts();
    console.log(posts);
  }, []);

  // const projects = [
  //   {
  //     id: 1,
  //     name: "E-commerce Platform",
  //     description:
  //       "Building a modern e-commerce platform with React, Node.js, and MongoDB. Need help with payment integration.",
  //     techStack: ["React", "Node.js", "MongoDB", "Stripe"],
  //     requirements: ["Backend Developer", "UI/UX Designer"],
  //     posted: "1 day ago",
  //   },
  //   {
  //     id: 2,
  //     name: "Mobile Fitness App",
  //     description:
  //       "Creating a fitness tracking app with React Native. Looking for developers interested in health tech.",
  //     techStack: ["React Native", "Firebase", "Redux"],
  //     requirements: ["Mobile Developer", "Backend Developer"],
  //     posted: "3 days ago",
  //   },
  // ];

  return (
    <div className="bg-gray-300 min-h-[97vh]">
      <div className="container mx-auto flex max-w-7xl">
        {/* Left Sidebar */}
        <div className="w-64 bg-white h-screen sticky top-0 border-r border-gray-200 p-4">
          {/* <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600">SkillBarter</h1>
          </div> */}

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

        {/* Center Posts Feed */}
        <div className="flex-1 px-6 py-4 max-w-2xl">
          <InstantPost />

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center cursor-pointer justify-between">
                  <div
                    onClick={() => {
                      navigate(`/load-profile?id=${post.userId}`);
                    }}
                    className="flex items-center space-x-3"
                  >
                    <img
                      src={post.pic ? post.pic : defImg}
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
                <div
                  className="image cursor-pointer"
                  onClick={() => {
                    navigate(`/post?id=${post._id}`);
                  }}
                >
                  {post.image && (
                    <div className="relative">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => like()}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                      >
                        <Heart
                          size={20}
                          className="text-gray-500"
                          onClick={(e) => {
                            e.currentTarget.classList.toggle("text-red-500");
                            e.currentTarget.classList.toggle("text-gray-500");
                          }}
                        />
                        <span className="text-sm">{post.likes}</span>
                      </button>

                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
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
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="commentsection ">
                  {post.comments.map((comment) => (
                    <div key={comment._id} className="flex flex-col">
                      <div
                        onClick={() => {
                          navigate(`/load-profile?id=${comment.userId}`);
                        }}
                        className="flex cursor-pointer"
                      >
                        <img
                          className="rounded-full w-10 h-10"
                          src={comment.pic || defImg}
                          alt=""
                        />
                        <span>{comment.username || "Anonymous User"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Projects Section */}
        {/* <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="sticky top-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Active Projects
              </h2>
              <button className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 mb-4 flex items-center justify-center space-x-2">
                <Plus size={16} />
                <span>Create Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {project.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {project.posted}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-600 mb-1">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-slate-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-600 mb-1">
                      Looking for:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-slate-600 text-white py-1 px-3 rounded text-xs hover:bg-slate-700">
                      Join Project
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-1 px-3 rounded text-xs hover:bg-gray-50">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Trending Skills
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">React.js</span>
                  <span className="text-blue-600 font-medium">+15%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Python</span>
                  <span className="text-blue-600 font-medium">+12%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">UI/UX Design</span>
                  <span className="text-blue-600 font-medium">+10%</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    // <></>
  );
};

export default HomePage;
