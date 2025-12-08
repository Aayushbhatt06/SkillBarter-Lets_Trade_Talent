import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, MessageSquare, User, Settings, Proportions } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [SearchConn, setSearchConn] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState([]);
  const [processedConn, setProcessedConn] = useState(connections);

  const userId = useSelector((state) => state.user.id);

  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/connection/fetchcon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userId ? { userId } : {}),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(true);
        setMessage(data.message || "Something went wrong");
        setConnections([]);
        return;
      }

      setError(false);
      setMessage(data.message);
      setConnections(data.connections || []);
    } catch (err) {
      setError(true);
      setMessage(err?.message || "Network error");
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setError(false);
      setMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, error]);

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (SearchConn.trim().length > 1) {
      const filtered = connections.filter((conn) =>
        conn.user.name.toLowerCase().includes(SearchConn.toLowerCase())
      );
      setProcessedConn(filtered);
    } else {
      setProcessedConn(connections);
    }
  }, [SearchConn, connections]);

  const handleChatNavigation = (user, id) => {
    navigate(`/chat?id=${id}`, {
      state: { otherUser: user },
    });
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
      <div className="w-[20vw] bg-white h-full sticky top-0 border-r border-gray-200 p-4">
        <nav className="bg-slate-50 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-slate-50 rounded-lg font-medium !no-underline"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg !no-underline"
          >
            <User size={20} />
            <span>Profile</span>
          </Link>

          <Link
            to="/newproject"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg !no-underline"
          >
            <Proportions size={20} />
            <span>New Project</span>
          </Link>
        </nav>
        <div className="messages mt-8 p-4 bg-white/70 border rounded-xl shadow-sm max-w-[20vw]">
          <div className="msg_heading flex items-center gap-3">
            <MessageSquare className="text-blue-700" />
            <h3 className="font-semibold !text-blue-700/80 mb-3">Messages</h3>
          </div>

          <input
            type="text"
            placeholder="Search connections..."
            value={SearchConn}
            onChange={(e) => setSearchConn(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-300 mb-3"
          />

          <div className="space-y-2 max-h-[33vh] overflow-y-auto">
            {processedConn.map((conn) => (
              <div key={conn.user._id}>
                <div
                  onClick={() => {
                    handleChatNavigation(conn.user, conn.user._id);
                  }}
                  className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                >
                  <img
                    src={conn.user.image || "image.png"}
                    alt={conn.user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                  <div className=" min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {conn.user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conn.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </div>
                <div className="border-b mt-1  border-gray-200 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
