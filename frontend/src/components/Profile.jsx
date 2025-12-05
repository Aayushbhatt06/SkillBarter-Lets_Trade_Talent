import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [connections, setConnections] = useState([]);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("image.png");
  const [skills, setSkills] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [showConnections, setShowConnections] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  };

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/connection/fetchcon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userId ? { userId } : {}),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(true);
        setMessage(data.message || "Something went wrong");
        setConnections([]);
        return;
      }

      setError(false);
      setMessage(data.message);
      setConnections(data.connections || []);
    } catch (err) {
      setError(true);
      setMessage(err?.message || "Network error");
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setError(false);
      setMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, error]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    fetchConnections();
  }, []);

  const handlePostClick = (post) => {
    navigate(`/load-post?postId=${post._id}`);
    console.log("Post clicked:", post);
  };

  const handleConnectionClick = () => {
    setShowConnections(!showConnections);
  };

  const handleEditProfile = () => {
    navigate(`/profile/edit`);
  };

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
      {message && (
        <div
          className={`
            fixed bottom-6 right-6 z-50
            px-5 py-3 rounded-xl shadow-lg
            text-white font-semibold text-sm
            backdrop-blur-md 
            animate-bounce
            ${error ? "bg-red-500/80" : "bg-green-500/80"}
          `}
        >
          {message}
        </div>
      )}
      <div className="bg rounded-lg min-h-screen mt-0">
        <div className="flex flex-col rounded-xl ml-5 min-w-[80vw] min-h-screen bg-white w-full max-w-3xl mt-3 p-4 relative">
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
                  <span className="font-semibold">{connections.length}</span>{" "}
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
                onDoubleClick={() => handlePostClick(p)}
                key={`post-${i}`}
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
                onDoubleClick={() => handlePostClick(p)}
                key={`project-${i}`}
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
              <div className="bg-white rounded-lg p-6 min-w-[30vw] relative">
                <h3 className="text-xl font-semibold mb-4">Connections</h3>

                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
                  onClick={() => setShowConnections(false)}
                >
                  ✕
                </button>

                <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
                  {connections.length === 0 && (
                    <div className="text-gray-500 text-center py-3">
                      No connections found
                    </div>
                  )}

                  {connections.map((c, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                    >
                      <img
                        src={c.image || "image.png"}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span className="text-md font-medium">
                        {c.name || c.email || `Connection ${index + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
