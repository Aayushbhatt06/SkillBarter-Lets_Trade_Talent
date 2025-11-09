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
      if (!res.ok) {
        alert("error");
        return;
      }
      const data = await res.json();
      setPosts((prevPosts) => [data.post, ...prevPosts]);
      setTitle("");
      setDesc("");
      setImage("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
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
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={user.image || defImg}
              alt="Your avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 space-y-2 w-full">
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Post Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <button
              onClick={handleButonClick}
              className="flex items-center space-x-2 text-blue-600 hover:bg-slate-50 px-3 py-1 rounded"
            >
              <Camera size={16} />
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
              className="bg-slate-600 text-white px-4 py-2 !rounded-full hover:bg-slate-700"
            >
              Post
            </button>
          </div>
          {image && (
            <div className="mt-3">
              <img src={image} alt="preview" className="max-h-40 rounded" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InstantPost;
