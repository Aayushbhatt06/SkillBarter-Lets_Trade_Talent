import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [userReq, setUserReq] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchReq = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/connection/fetchreq`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setMessage("Something Went Wrong");
        setError(true);
        return;
      }
      const data = await res.json();
      console.log(data);
      setUserReq(data.connections || []);
    } catch (err) {
      setError(true);
      setMessage(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const reqAccept = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/connection/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ conId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        setMessage(data.message || "Something went wrong while accepting");
        return;
      }

      setError(false);
      setMessage(data.message || "Request accepted successfully");
      fetchReq();
    } catch (err) {
      setError(true);
      setMessage(err.message || "Network error");
    }
  };

  const reqReject = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/connection/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ conId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        setMessage(data.message || "Something went wrong while rejecting");
        return;
      }
      setError(false);
      setMessage(data.message || "Request rejected successfully");
      fetchReq();
    } catch (err) {
      setError(true);
      setMessage(err.message || "Network error");
    }
  };

  const handleProfileNavigate = (userId) => {
    navigate(`/load-profile?id=${userId}`);
  };

  useEffect(() => {
    fetchReq();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchReq();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {/* Loading Spinner */}
      <div
        className={`${
          loading ? "flex" : "hidden"
        } flex-col justify-center items-center fixed inset-0 bg-white/80 backdrop-blur-sm z-50`}
      >
        <img className="w-16 h-16" src="Spinner.gif" alt="Loading..." />
        <p className="text-gray-600 mt-3 font-medium">Loading...</p>
      </div>

      {/* Toast Message */}
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

      {/* Main Container */}
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Notifications
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your connection requests
                </p>
              </div>
              {userReq.length > 0 && (
                <div className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm">
                  {userReq.length} Pending
                </div>
              )}
            </div>
          </div>

          {/* Connection Requests */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Connection Requests
              </h2>
            </div>

            {userReq.length === 0 ? (
              // Empty State
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Pending Requests
                </h3>
                <p className="text-gray-500">
                  You're all caught up! New connection requests will appear
                  here.
                </p>
              </div>
            ) : (
              // Requests List
              <div className="divide-y divide-gray-200">
                {userReq.map((con) => (
                  <div
                    key={con._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* User Info */}
                      <div
                        onClick={() => handleProfileNavigate(con.users[0]._id)}
                        className="flex items-center gap-4 cursor-pointer hover:opacity-70 transition-opacity flex-1"
                      >
                        <img
                          src={con.users[0].image || "image.png"}
                          alt={con.users[0].name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {con.users[0].name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            wants to connect with you
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => reqAccept(con._id)}
                          className="flex-1 sm:flex-none px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => reqReject(con._id)}
                          className="flex-1 sm:flex-none px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Notifications Section (Placeholder) */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Other Notifications
              </h2>
            </div>
            <div className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No New Notifications
              </h3>
              <p className="text-gray-500">
                You'll see updates about posts, projects, and more here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
