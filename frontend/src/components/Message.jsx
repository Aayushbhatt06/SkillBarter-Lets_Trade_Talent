import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";
import { socket } from "../../utils/Socket";
import { useDispatch } from "react-redux";

const Message = () => {
  const location = useLocation();
  const navState = location.state;
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const params = new URLSearchParams(location.search);
  const receiverId = params.get("id");
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const messagesEndRef = useRef(null);

  const otherUser = navState.otherUser;

  const msgAt = (createdAt) => {
    return new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleMessageReceived = (msg) => {
    if (!roomId || msg.roomId === roomId) {
      console.log(msg);
      console.log(userId);
      setMessages((prev) => [...prev, msg]);
    }
    socket.emit("markAsRead", { from: receiverId });
  };

  const loadMessages = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chat/loadmsg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id: receiverId }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message || "Error occured in try block");
      }
      setMessages(data.chats);
    } catch (err) {
      console.log(err || "Server Error");
    }
  };

  useEffect(() => {
    if (!receiverId) return;

    loadMessages();
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("joinChat", { otherUserId: receiverId });

    socket.on("joinedChat", ({ roomId }) => {
      console.log("Joined room:", roomId);
      setRoomId(roomId);
    });
    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("joinedChat");
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [receiverId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleTyping = ({ roomId: rId, userId: senderId }) => {
      if (senderId?.toString() === receiverId?.toString()) {
        setIsOtherTyping(true);
      }
    };

    const handleStopTyping = ({ roomId: rId, userId: senderId }) => {
      if (senderId?.toString() === receiverId?.toString()) {
        setIsOtherTyping(false);
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.emit("markAsRead", { from: receiverId });

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [receiverId]);

  const handleSend = () => {
    const text = newMsg.trim();
    if (!text || !receiverId) return;
    socket.emit("sendMessage", {
      to: receiverId,
      text,
    });

    setNewMsg("");
  };

  useEffect(() => {
    if (!socket) return;
    if (newMsg.trim().length > 0 && isTyping === false) {
      socket.emit("typing", { to: receiverId });
      setIsTyping(true);
    }
    if (newMsg.trim().length === 0 && isTyping === true) {
      socket.emit("stopTyping", { to: receiverId });
      setIsTyping(false);
    }
  }, [newMsg]);

  useEffect(() => {
    if (!userId) {
      const fetchUser = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/profile`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!res.ok) throw new Error("Failed to fetch user");
          const data = await res.json();

          const userPayload = {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
            skills: data.user.skills || [],
          };

          dispatch(login(userPayload));
        } catch (err) {
          console.error("User fetch error:", err);
        }
      };
      socket.emit("markAsRead", { from: receiverId });
      fetchUser();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-67px)] w-full max-w-full bg-gray-100">
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-800 px-3 py-3 sm:px-4 sm:py-4 rounded-b-xl sm:rounded-b-2xl shadow-lg flex-shrink-0">
          <img
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0"
            src={otherUser.image || "image.png"}
            alt=""
          />
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-base sm:text-xl font-semibold text-white truncate">
              {otherUser.name}
            </p>

            {isOtherTyping && (
              <span className="text-xs sm:text-sm text-gray-300 italic">
                Typing...
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
          <div className="flex flex-col gap-2 sm:gap-3">
            {messages.map((msg) => {
              const senderId = msg?.sender?._id ?? msg?.sender;
              const isOwn = senderId?.toString() === userId?.toString();

              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`shadow px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm max-w-[75%] sm:max-w-[65%] md:max-w-[60%] break-words ${
                      isOwn ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    <p className="break-words">{msg.message}</p>
                    <div
                      className={`flex mt-1 ${
                        isOwn
                          ? "justify-end text-[10px] sm:text-[12px] text-gray-100"
                          : "justify-start text-[10px] sm:text-[12px] text-gray-500"
                      }`}
                    >
                      {msgAt(msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex items-center rounded-t-lg bg-slate-800 px-2 py-2 sm:px-3 sm:py-3 gap-2 sm:gap-3 shadow-lg flex-shrink-0">
          <input
            placeholder="Enter Message to Send"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 min-w-0 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
          />
          <button
            title="Send"
            onClick={handleSend}
            className="border-gray-200 bg-slate-700 border-2 p-2 sm:p-2.5 flex items-center justify-center rounded-lg hover:bg-slate-900 transition-colors flex-shrink-0"
          >
            <Send className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;
