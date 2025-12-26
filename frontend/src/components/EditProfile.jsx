import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AVAILABLE_SKILLS = [
  "java",
  "python",
  "javascript",
  "typescript",
  "c",
  "cpp",
  "go",
  "rust",
  "php",
  "kotlin",
  "swift",
  "html",
  "css",
  "sass",
  "tailwind",
  "bootstrap",
  "react",
  "nextjs",
  "vue",
  "angular",
  "node",
  "express",
  "nestjs",
  "springboot",
  "django",
  "flask",
  "fastapi",
  "mongodb",
  "mysql",
  "postgresql",
  "redis",
  "sqlite",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "nginx",
  "linux",
  "restapi",
  "graphql",
  "socketio",
  "jwt",
  "oauth",
  "git",
  "github",
  "ci/cd",
  "systemdesign",
  "dsa",
  "microservices",
  "testing",
  "performance",
];

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("image.png");
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const filteredSkills = AVAILABLE_SKILLS.filter((skill) =>
    skill.includes(skillSearch.toLowerCase())
  );

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        credentials: "include",
      });
      if (!res.ok) {
        setError(true);
        setMessage("Something went wrong");
        throw new Error();
      }
      const data = await res.json();
      setName(data.user.name || "");
      setBio(data.user.bio || "");
      setSkills(data.user.skills || []);
      setImage(data.user.image || "image.png");
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(selected);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("skills", JSON.stringify(skills));
    if (file) formData.append("profileImage", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/profile/edit`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) {
        setError(true);
        setMessage("Something Went Wrong for editing");
        throw new Error();
      }
      navigate("/profile");
    } catch (err) {
      setError(true);
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <img className="w-20 h-20" src="/Spinner.gif" alt="Loading" />
        </div>
      )}
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

      <div className="flex justify-center bg-gray-900 min-h-[90vh] py-6">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 w-full max-w-5xl flex gap-8">
          <div className="flex-shrink-0">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500">
              <img src={image} className="w-full h-full object-cover" />
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl text-white font-bold mb-6">Edit Profile</h2>

            <div className="space-y-6">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
                placeholder="Name"
              />

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg resize-none"
                rows={4}
                placeholder="Bio"
              />

              <div>
                <label className="text-white font-semibold mb-2 block">
                  Skills
                </label>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <input
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Search skills..."
                  className="w-full mb-4 p-2 bg-gray-700 text-white !rounded-lg"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                  {filteredSkills.map((skill) => {
                    const selected = skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-2 !rounded-lg text-sm font-semibold
                          ${
                            selected
                              ? "bg-green-600 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 !rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 !rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
