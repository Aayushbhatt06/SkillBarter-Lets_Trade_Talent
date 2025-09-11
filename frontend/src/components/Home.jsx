import React, { useState } from "react";
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

const HomePage = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) { 
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };
  
  // Sample data
  const posts = [
    {
      id: 1,
      username: "john_developer",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      timeAgo: "2 hours ago",
      description:
        "Just completed my first full-stack MERN application! Looking for feedback from the community. Would love to connect with other developers.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      username: "sarah_designer",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      timeAgo: "4 hours ago",
      description:
        "New UI/UX design for a fitness app. What do you think about the color scheme and layout? Always open to constructive criticism!",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
      likes: 45,
      comments: 12,
    },
  ];

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description:
        "Building a modern e-commerce platform with React, Node.js, and MongoDB. Need help with payment integration.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      requirements: ["Backend Developer", "UI/UX Designer"],
      posted: "1 day ago",
    },
    {
      id: 2,
      name: "Mobile Fitness App",
      description:
        "Creating a fitness tracking app with React Native. Looking for developers interested in health tech.",
      techStack: ["React Native", "Firebase", "Redux"],
      requirements: ["Mobile Developer", "Backend Developer"],
      posted: "3 days ago",
    },
  ];

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
              to="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Link
              to="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
            <Link
              to="#"
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
          <div className="mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Share your skills, projects, or ask for help..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-blue-600 hover:bg-slate-50 px-3 py-1 rounded">
                  <Camera size={16} />
                  <span>Photo</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:bg-slate-50 px-3 py-1 rounded">
                  <Target size={16} />
                  <span>Project</span>
                </button>
                <button className="bg-slate-600 text-white px-4 py-1 rounded-full hover:bg-slate-700">
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.userAvatar}
                      alt={`${post.username} avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        @{post.username}
                      </h3>
                      <p className="text-sm text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-800 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="relative">
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
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                      >
                        <Heart
                          size={20}
                          fill={likedPosts.has(post.id) ? "#ef4444" : "none"}
                          className={
                            likedPosts.has(post.id) ? "text-red-500" : ""
                          }
                        />
                        <span className="text-sm">
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </span>
                      </button>

                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                        <MessageCircle size={20} />
                        <span className="text-sm">{post.comments}</span>
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
              </div>
            ))}
          </div>
        </div>

        {/* Right Projects Section */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
