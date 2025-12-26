import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectContributions = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedProject, setExpandedProject] = useState(null);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contribution/my-projects`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(true);
        setMessage(data.message || "Failed to fetch contributions");
        setProjects([]);
        return;
      }

      setProjects(data.data || []);
    } catch (err) {
      setError(true);
      setMessage(err?.message || "Network error");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (contriId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contribution/accept`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ contriId }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(true);
        setMessage(data.message || "Failed to accept contribution");
        return;
      }

      setError(false);
      setMessage("Contribution accepted successfully");
      fetchContributions();
    } catch (err) {
      setError(true);
      setMessage(err?.message || "Network error");
    }
  };

  const handleReject = async (contriId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contribution/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ contriId }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(true);
        setMessage(data.message || "Failed to reject contribution");
        return;
      }

      setError(false);
      setMessage("Contribution rejected successfully");
      fetchContributions();
    } catch (err) {
      setError(true);
      setMessage(err?.message || "Network error");
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setError(false);
      setMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, error]);

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleProfileNavigate = (userId) => {
    navigate(`/load-profile?id=${userId}`);
  };

  return (
    <>
      <div
        className={`${
          loading ? "flex" : "hidden"
        } flex-col justify-center items-center fixed inset-0 bg-white/80 backdrop-blur-sm z-50`}
      >
        <img className="w-16 h-16" src="Spinner.gif" alt="Loading..." />
        <p className="text-gray-600 mt-3 font-medium">Loading...</p>
      </div>

      {message && (
        <div
          className={`
            fixed bottom-8 right-8 z-50
            px-6 py-3 rounded-lg shadow-xl
            text-white font-medium text-sm
            transition-all duration-300
            ${error ? "bg-red-500" : "bg-green-500"}
          `}
        >
          {message}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              My Project Contributions
            </h1>
            <p className="text-gray-600 mt-2">
              Manage contribution requests for your projects
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">
                No contribution requests yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <div
                    onClick={() => toggleProject(project._id)}
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                          {project.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm">
                          {project.contributors.length} Request
                          {project.contributors.length !== 1 ? "s" : ""}
                        </span>
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform ${
                            expandedProject === project._id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {expandedProject === project._id && (
                    <div className="border-t border-gray-200">
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Contributor
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Requested At
                              </th>
                              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {project.contributors.map((contributor) => (
                              <tr
                                key={contributor.contriId}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div
                                    onClick={() =>
                                      handleProfileNavigate(contributor.userId)
                                    }
                                    className="flex items-center gap-3 cursor-pointer hover:opacity-70"
                                  >
                                    <img
                                      src={contributor.image || "image.png"}
                                      alt={contributor.name}
                                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                                    />
                                    <span className="font-medium text-gray-800">
                                      {contributor.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      contributor.status === "accepted"
                                        ? "bg-green-100 text-green-700"
                                        : contributor.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                                  >
                                    {contributor.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      contributor.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                  {new Date(
                                    contributor.requestedAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </td>
                                <td className="px-6 py-4">
                                  {contributor.status === "pending" && (
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() =>
                                          handleAccept(contributor.contriId)
                                        }
                                        className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleReject(contributor.contriId)
                                        }
                                        className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="md:hidden divide-y divide-gray-200">
                        {project.contributors.map((contributor) => (
                          <div key={contributor.contriId} className="p-4">
                            <div
                              onClick={() =>
                                handleProfileNavigate(contributor.userId)
                              }
                              className="flex items-center gap-3 mb-3 cursor-pointer"
                            >
                              <img
                                src={contributor.image || "image.png"}
                                alt={contributor.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                              />
                              <div className="flex-1">
                                <span className="font-medium text-gray-800 block">
                                  {contributor.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    contributor.requestedAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  contributor.status === "accepted"
                                    ? "bg-green-100 text-green-700"
                                    : contributor.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {contributor.status.charAt(0).toUpperCase() +
                                  contributor.status.slice(1)}
                              </span>
                            </div>
                            {contributor.status === "pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleAccept(contributor.contriId)
                                  }
                                  className="flex-1 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleReject(contributor.contriId)
                                  }
                                  className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectContributions;
