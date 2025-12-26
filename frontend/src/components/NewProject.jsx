import React, { useState, useRef, useEffect } from "react";
import { X, Camera } from "lucide-react";

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

const NewProject = () => {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const fileInputRef = useRef(null);

  const filteredSkills = AVAILABLE_SKILLS.filter((skill) =>
    skill.includes(skillSearch.toLowerCase())
  );

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      setMessage("");
      setError(false);
    }, 5000);
    return () => clearTimeout(t);
  }, [message]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    const formData = new FormData();
    formData.append("name", title);
    formData.append("requiredSkills", JSON.stringify(skills));
    formData.append("description", description);
    if (file) formData.append("image", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/project`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      setMessage("Project uploaded successfully!");
      setTitle("");
      setDescription("");
      setSkills([]);
      setSkillSearch("");
      setImage(null);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(true);
      setMessage("Error: Failed to upload project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50">
          <img className="w-20 h-20" src="Spinner.gif" alt="Loading" />
          <p className="mt-2 font-semibold">Loading...</p>
        </div>
      )}

      {message && (
        <div
          className={`mx-5 mt-3 p-4 rounded-xl text-white font-semibold text-center
            ${error ? "bg-red-400" : "bg-green-400"}
          `}
        >
          {message}
        </div>
      )}

      <div className="flex-1 bg-white rounded-lg ml-5 mt-3 px-6 py-4 mr-5 min-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="font-semibold">
            <label>Project Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ml-2 bg-gray-100 rounded-md px-3 py-2 border w-1/2"
              required
            />
          </div>

          {/* Skills */}
          <div className="font-semibold">
            <label>Required Skills:</label>

            {/* Selected skills */}
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {skill}
                  <button type="button" onClick={() => toggleSkill(skill)}>
                    <X className="size-4 hover:bg-black/20 p-1 rounded" />
                  </button>
                </span>
              ))}
            </div>

            {/* Search */}
            <input
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skills..."
              className="mt-3 bg-gray-100 rounded-md px-3 py-2 border w-1/2"
            />

            {/* Skill options */}
            <div className="mt-3 max-h-48 overflow-y-auto flex flex-wrap gap-2">
              {filteredSkills.map((skill) => {
                const selected = skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition
                      ${
                        selected
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }
                    `}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="font-semibold">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block mt-1 bg-gray-100 rounded-md px-3 py-2 border w-3/4 h-24"
              required
            />
          </div>

          {/* Image */}
          <div className="font-semibold">
            <label>Upload Image:</label>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 text-blue-600 hover:bg-slate-50 px-3 py-1 rounded mt-2"
            >
              <Camera size={16} />
              Choose Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-3 rounded-md border max-w-sm"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProject;
