import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [connections, setConnections] = useState([]);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("image.png");
  const [skills, setSkills] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [showConnections, setShowConnections] = useState(false);

  const fetchProfileData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unable to fetch profile data");

      const data = await res.json();
      setName(data.user.name || "");
      setSkills(data.user.skills || []);
      setBio(data.user.bio || "");
      setImage(data.user.image || "image.png");
      setPosts(data.posts || []);
      setProjects(data.projects || []);
      setPostCount(data.posts ? data.posts.length : 0);
      setProjectCount(data.projects ? data.projects.length : 0);
      setConnectionsCount(data.user.connections.length || 0);
      setConnections(data.user.connections || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handlePostClick = (post) => {
    console.log("Post clicked:", post);
  };

  const handleConnectionClick = () => {
    setShowConnections(!showConnections);
  };

  const handleEditProfile = () => {
    navigate(`/profile/edit`);
  };

  return (
    <div className="bg rounded-lg min-h-screen mt-0">
      <div className="flex flex-col rounded-xl ml-5 min-w-[80vw] min-h-screen bg-white w-full max-w-3xl  mt-3 p-4 relative">
        <div className="flex flex-col md:flex-row w-full md:items-start md:space-x-8">
          <div className="flex-shrink-0">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="rounded-full w-32 h-32 bg-gray-300 border-2 border-gray-300 flex items-center justify-center text-gray-700">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 mt-4 md:mt-0 flex flex-col">
            <div className="flex items-center space-x-4 gap-2">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <button
                onClick={handleEditProfile}
                className="px-2 py-1 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
            <div className="flex space-x-6 mt-4">
              <div>
                <span className="font-semibold">{postCount}</span> posts
              </div>
              <div>
                <span className="font-semibold">{projectCount}</span> projects
              </div>
              <div
                onClick={handleConnectionClick}
                className="cursor-pointer relative"
              >
                <span className="font-semibold">{connectionsCount}</span>{" "}
                connections
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm">{bio}</p>
            </div>
            <div className="skills mt-2">
              {skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm font-medium">{skill}</span>
                  {index !== skills.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-8 w-full">
          {posts.map((p, i) => (
            <div
              onClick={() => handlePostClick(p)}
              key={i}
              className="relative cursor-pointer"
            >
              <img
                src={p.image || "image.png"}
                alt={p.title || ""}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-1 text-xs">
                <p>{p.title}</p>
              </div>
            </div>
          ))}
          {projects.map((p, i) => (
            <div
              onClick={() => handlePostClick(p)}
              key={i}
              className="relative cursor-pointer"
            >
              <img
                src={p.image || "image.png"}
                alt={p.title || ""}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-1 text-xs">
                <p>{p.title}</p>
              </div>
            </div>
          ))}
        </div>

        {showConnections && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto relative">
              <h3 className="text-xl font-semibold mb-4">Connections</h3>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
                onClick={() => setShowConnections(false)}
              >
                ✕
              </button>
              <ul>
                {connections.length === 0 && (
                  <li className="text-gray-500">No connections found</li>
                )}
                {connections.map((c, index) => (
                  <li key={index} className="border-b py-2">
                    {c.name || c.email || `Connection ${index + 1}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
