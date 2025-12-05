import React, { useState } from "react";
import { sendConnection } from "./SendConnection";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  if (!project) return null;

  const owner =
    project.userId && typeof project.userId === "object"
      ? project.userId
      : {
          _id: project.userId || "",
          name: project.username || "Unknown User",
          image: project.profilePic || "image.png",
        };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

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
  };

  const handleConnection = async (receiverId) => {
    if (!receiverId) return;
    const res = await sendConnection(receiverId);

    if (!res.ok || res.data?.success === false) {
      setError(true);
      setMessage(res.data?.message || "Something went wrong");
    } else {
      setError(false);
      setMessage(res.data?.message || "Request Sent Successfully");
    }

    setTimeout(() => {
      setMessage("");
      setError(false);
    }, 4000);
  };

  return (
    <>
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
      <div className="outer min-w-[35vw] max-w-[35vw] min-h-full flex">
        <div className="inner flex flex-col mx-3 mt-4 bg-white min-w-[35vw] max-w-[35vw] min-h-full rounded-lg">
          <div className="profile flex justify-between items-center p-2">
            <div
              onClick={() =>
                owner._id && navigate(`/load-profile?id=${owner._id}`)
              }
              className="imgname cursor-pointer flex gap-3 items-center"
            >
              <img
                src={owner.image || "image.png"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="nametime flex flex-col">
                <span className="font-semibold">{owner.name}</span>
                <p>{timeAgo(project.createdAt)}</p>
              </div>
            </div>
            <button
              onClick={() => handleConnection(owner._id)}
              className="bg-blue-500 text-white px-3 py-1 !rounded-lg"
            >
              Connect
            </button>
          </div>

          {project.image ? (
            <div className="image">
              <img
                className="w-full object-cover rounded-b-lg"
                src={project.image}
                alt="project"
              />
            </div>
          ) : null}

          <div className="disc p-3">
            <div className="title mb-2">
              <strong>Title: </strong>
              {project.name}
            </div>
            <div className="descript mb-2">
              <strong>Description: </strong>
              <p>{project.description}</p>
            </div>
            <div className="requiredskills mt-2">
              <strong>Required Skills:</strong>{" "}
              {project.requiredSkills?.map((skill, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm font-medium">{skill}</span>
                  {index !== project.requiredSkills.length - 1 && (
                    <span>, </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="status flex">
              <strong>Status: </strong>&nbsp;
              {project.fulfilled ? "Fulfilled" : "Open"}
            </div>
          </div>

          <div className="button">
            <button className="bg-blue-600 mx-5 my-2 mb-4 p-2 px-5 !rounded-xl text-white">
              <strong>Enroll</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
