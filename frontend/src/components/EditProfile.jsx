import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [image, setImage] = useState("image.png");
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const fetchProfileData = async () => {
    try {
      const res = await fetch("http://localhost:8080/profile", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unable to fetch profile data");
      const data = await res.json();
      setName(data.user.name || "");
      setBio(data.user.bio || "");
      setSkills(data.user.skills || []);
      setImage(data.user.image || "image.png");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const skillTrimmed = newSkill.trim();
    if (skillTrimmed && !skills.includes(skillTrimmed)) {
      setSkills([...skills, skillTrimmed]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("http://localhost:8080/profile/edit", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({ name, bio, skills }),
  //     });
  //     if (!res.ok) {
  //       alert("Something went Worng while updating");
  //       return;
  //     }
  //     const data = await res.json();
  //     navigate("/profile");
  //   } catch (error) {
  //     alert("Catching the error something went wrong");
  //   }

  //   //image
  //   const formData = new FormData();
  //   formData.append("profileImage", file);
  //   try {
  //     const res = await fetch("http://localhost:8080/profile/up-image", {
  //       method: "POST",
  //       credentials: "include",
  //       body: formData,
  //     });
  //     if (!res.ok) {
  //       alert("Something went Worng while updating");
  //       return;
  //     }
  //     const data = await res.json();
  //     setImage(data.url);
  //     alert(data.message);
  //     navigate("/profile");
  //   } catch (error) {
  //     alert("Catching the error something went wrong");
  //   }
  // };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("skills", JSON.stringify(skills));
    if (file) {
      formData.append("profileImage", file); // this works with multer
    }

    try {
      const res = await fetch("http://localhost:8080/profile/edit", {
        method: "POST",
        credentials: "include", // keeps cookies/session for LoggedInOnly
        body: formData,
      });

      if (!res.ok) {
        alert("Something went wrong while updating");
        return;
      }

      const data = await res.json();
      alert(data.message);
      navigate("/profile");
    } catch (error) {
      alert("Error while saving profile");
    }
  };

  return (
    <div className="flex justify-center bg-gray-900 w-screen min-h-[90vh] py-10">
      <div className="container bg-gray-800 rounded-2xl border border-gray-700 p-8 sm:p-12 md:p-16 w-full max-w-5xl flex gap-8">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="image-upload"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              Change
            </label>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl text-white font-bold mb-6">
            Edit Profile
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              ></textarea>
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                  placeholder="Add a new skill"
                  className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
