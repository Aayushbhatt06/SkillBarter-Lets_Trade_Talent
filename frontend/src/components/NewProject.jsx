import React, { useState, useRef, useEffect } from "react";
import { X, Camera } from "lucide-react";
import { useSelector } from "react-redux";

const NewProject = () => {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillinput, setSkillinput] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError(false);
    }, 5000);
  }, [message]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSkill = (e) => {
    e.preventDefault();
    if (skillinput.trim() !== "") {
      setSkills([...skills, skillinput.trim()]);
      setSkillinput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setMessage("");

    const formdata = new FormData();
    formdata.append("name", title);
    formdata.append("requiredSkills", JSON.stringify(skills));
    formdata.append("description", description);
    if (file) {
      formdata.append("image", file);
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/project`,
        {
          method: "POST",
          credentials: "include",
          body: formdata,
        }
      );

      if (!res.ok) {
        setError(true);
        throw new Error("Failed to upload project");
      }

      const data = await res.json();

      console.log("Success:", data);
      setMessage("Project uploaded successfully!");
      setError(false);

      setTitle("");
      setDescription("");
      setImage(null);
      setFile(null);
      setSkills([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(true);
      console.error("Error submitting project:", err);
      setMessage("Error: Failed to upload project. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
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
        <div className="status flex">
          <div
            className={`${
              error ? "bg-red-400" : "bg-green-400"
            } text-white p-4 w-full h-[10vh] mx-5 mt-3 rounded-xl flex items-center justify-center font-semibold transition-all`}
          >
            {message}
          </div>
        </div>
      )}

      <div className="flex-1 bg-white rounded-lg ml-5 mt-3 px-6 py-4 mr-5 min-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="font-semibold">
            <label>Project Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ml-2 bg-gray-100 rounded-md px-3 py-1 border border-gray-300 w-1/2"
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="font-semibold">
            <div className="flex items-center">
              <label>Required Skills:</label>
              <input
                type="text"
                value={skillinput}
                onChange={(e) => setSkillinput(e.target.value)}
                className="ml-2 bg-gray-100 rounded-md px-3 py-1 border border-gray-300 w-1/2"
                placeholder="e.g. React, Node.js"
              />
              <button
                onClick={handleSkill}
                className="bg-blue-600 text-white !rounded-xl p-2 !ml-3"
              >
                Add Skill
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 flex items-center gap-2 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)}>
                    <X className="size-5 hover:bg-black/20 p-1 rounded-lg" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="font-semibold">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block mt-1 bg-gray-100 rounded-md px-3 py-1 border border-gray-300 w-3/4 h-24"
              placeholder="Write project description..."
              required
            ></textarea>
          </div>

          <div className="font-semibold">
            <label>Upload Image:</label>
            <button
              onClick={handleButtonClick}
              className="flex items-center space-x-2 text-blue-600 hover:bg-slate-50 px-3 py-1 rounded mt-2"
            >
              <Camera size={16} />
              <span>Choose Photo</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-3  object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProject;
