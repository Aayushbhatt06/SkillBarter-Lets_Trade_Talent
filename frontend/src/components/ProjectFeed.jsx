import React, { useEffect } from "react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
const ProjectFeed = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
      <div
        className={`${
          loading ? "flex" : "hidden"
        } flex-col justify-center items-center fixed inset-0 bg-white/70 backdrop-blur-sm z-50`}
      >
        <img className="w-20 h-20" src="Spinner.gif" alt="Loading..." />
        <p className="text-gray-700 mt-2 font-semibold">Loading...</p>
      </div>
      <div className="main max-w-[40vw] min-w-[35vw]  ">
        <div className="content flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard project={project} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectFeed;
