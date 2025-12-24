import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, MessageSquare, User, Proportions, ChartPie } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/Socket";

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
    const handleConnectionUpdated = (conn) => {
      setConnections((prev) => {
        let next;

        const exists = prev.some((c) => c._id === conn._id);

        if (exists) {
          next = prev.map((c) => (c._id === conn._id ? conn : c));
        } else {
          next = [conn, ...prev];
        }
        return [...next].sort(
          (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
        );
      });
    };

    socket.on("connectionUpdated", handleConnectionUpdated);

    fetchConnections();

    return () => {
      socket.off("connectionUpdated", handleConnectionUpdated);
    };
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

  const msgAt = (createdAt) => {
    return new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
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
      <div className="hidden md:block w-[20vw] bg-white h-full sticky top-0 border-r border-gray-200 p-4">
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
          <Link
            to="/contribution"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg !no-underline"
          >
            <ChartPie size={20} />
            <span>Contributions</span>
          </Link>
        </nav>
        <div className="messages mt-4 p-4 bg-white/70 border rounded-xl shadow-sm max-w-[20vw]">
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

          <div className="space-y-2 max-h-[30vh] overflow-y-auto">
            {processedConn.map((conn) => (
              <div key={conn._id}>
                <div
                  onClick={() => handleChatNavigation(conn.user, conn.user._id)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer "
                >
                  <img
                    src={conn.user.image || "image.png"}
                    alt={conn.user.name}
                    className="w-8 h-8 rounded-full obj ect-cover"
                  />
                  <div className="flex w-full gap-2 min-w-0">
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <p className="font-semibold text-[12px] text-gray-900 truncate">
                          {conn.user.name}
                        </p>

                        {conn.unreadCount > 0 && (
                          <div className="bg-blue-600 text-white text-[11px] rounded-full h-5 min-w-5 px-2 flex items-center justify-center shrink-0">
                            {conn.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <span
                          className={`text-[10px] truncate ${
                            conn.unreadCount > 0
                              ? "font-semibold text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          {conn.lastMessage || "No messages yet"}
                        </span>

                        <p className="text-[10px] text-gray-400 shrink-0">
                          {msgAt(conn.lastMessageAt) || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 ml-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
