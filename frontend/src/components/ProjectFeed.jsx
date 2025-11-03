import React, { useEffect } from "react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
const ProjectFeed = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const p = {
    _id: "6725a1b9f8a23400123abc01",
    name: "AI Chatbot for College Queries",
    username: "RiyaVerma",
    requiredSkills: ["Python", "NLP", "Flask"],
    image: "image.png",
    profilePic: "image.png",
    description:
      "An AI-based chatbot to assist students with college-related queries like fees, attendance, and schedules.",
    fulfilled: false,
    userId: "672599a2ab10d200456fgh01",
    createdAt: "2025-10-30T09:30:00.000Z",
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/fetchproject`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ presentProjects: projects }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        setMessage(data.message || "Failed to fetch projects");
        setLoading(false);
        return;
      }

      setProjects([...projects, ...data.Projects]);
      setError(false);
      setMessage(data.message);
      setLoading(false);
    } catch (error) {
      alert(error);
      setError(true);
      setMessage(error.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main max-w-[35vw] min-w-[35vw]  ">
        <div className="content flex flex-col">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectFeed;
