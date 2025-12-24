import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";

const defImg = "image.png";

const InstantPost = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleButonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    if (file) {
      formData.append("profileImage", file);
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
        setError(true);

        return;
      }

      setPosts((prevPosts) => [data.post, ...prevPosts]);
      setTitle("");
      setDesc("");
      setImage("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setMessage(data.message);
      setError(false);
    } catch (err) {
      console.error(error);
      setMessage(err);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 4000);
    }
  };

  return (
    <>
      <div
        className={`${
          loading ? "flex" : "hidden"
        } flex-col justify-center items-center fixed inset-0 bg-white/70 backdrop-blur-sm z-50`}
      >
        <img
          className="w-16 h-16 sm:w-20 sm:h-20"
          src="Spinner.gif"
          alt="Loading..."
        />
        <p className="text-gray-700 mt-2 font-semibold text-sm sm:text-base">
          Loading...
        </p>
      </div>
      {message && (
        <div
          className={`
      fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto z-50
      px-4 py-3 sm:px-5 rounded-xl shadow-lg
      text-white font-semibold text-xs sm:text-sm
      backdrop-blur-md 
      animate-bounce
      ${error ? "bg-red-500/80" : "bg-green-500/80"}
    `}
        >
          {message}
        </div>
      )}
      <div className="mb-4 sm:mb-6 px-3 sm:px-0">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 mb-3">
            <img
              src={user.image || defImg}
              alt="Your avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
            />
            <div className="flex flex-col gap-2 space-y-2 w-full">
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Post Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <button
              onClick={handleButonClick}
              className="flex items-center space-x-1.5 sm:space-x-2 text-blue-600 hover:bg-slate-50 px-2 py-1 sm:px-3 rounded text-sm sm:text-base"
            >
              <Camera size={16} className="sm:w-5 sm:h-5" />
              <span>Photo</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              onClick={handleSubmit}
              className="bg-slate-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base !rounded-full hover:bg-slate-700"
            >
              Post
            </button>
          </div>
          {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="preview"
                className="max-h-32 sm:max-h-40 rounded w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InstantPost;
