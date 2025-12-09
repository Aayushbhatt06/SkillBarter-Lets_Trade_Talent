const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const messageDb = require("../../Models/messages");
const Connection = require("../../Models/Connection");
require("dotenv").config();
const cookie = require("cookie");

const getRoomId = (userA, userB) =>
  [userA.toString(), userB.toString()].sort().join("@");

const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.jwt;
      if (!token) return next(new Error("No token Provided error"));

      const decoded = jwt.verify(token, process.env.SECRET);
      socket.user = { id: decoded._id };
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      return next(new Error("Server Auth Error"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user.id.toString();
    console.log("Socket Connected : ", socket.id, " User : ", userId);

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    socket.join(`user:${userId}`);

    io.emit("userOnline", { userId });
    socket.emit("onlineUsers", Array.from(onlineUsers.keys()));

    socket.on("joinChat", ({ otherUserId }) => {
      if (!otherUserId) return;

      const roomId = getRoomId(userId, otherUserId);
      socket.join(roomId);
      socket.emit("joinedChat", { roomId });
    });

    socket.on("sendMessage", async ({ to, text }) => {
      if (!to || !text) return;

      const otherUserId = to.toString();
      const roomId = getRoomId(userId, otherUserId);

      try {
        const msg = await messageDb.create({
          roomId,
          sender: userId,
          message: text,
          readBy: [userId],
        });

        const populatedMsg = await msg.populate("sender", "name image _id");

        const conn = await Connection.findOneAndUpdate(
          { roomId },
          {
            $set: {
              lastMessage: text,
              lastMessageAt: new Date(),
            },
            $inc: {
              [`unreadCounts.${otherUserId}`]: 1,
            },
          },
          { new: true }
        ).populate("users", "name image");

        const updatedConn = (targetUserId) => {
          const otherUser = conn.users.find(
            (u) => u._id.toString() !== targetUserId.toString()
          );

          if (!otherUser) return null;

          return {
            _id: conn._id,
            user: otherUser,
            lastMessage: conn.lastMessage,
            lastMessageAt: conn.lastMessageAt,
            unreadCount: conn.unreadCounts?.get(targetUserId.toString()) || 0,
            roomId: conn.roomId,
          };
        };

        const payloadForSender = updatedConn(userId);
        const payloadForReceiver = updatedConn(otherUserId);

        if (payloadForSender) {
          io.to(`user:${userId}`).emit("connectionUpdated", payloadForSender);
        }
        if (payloadForReceiver) {
          io.to(`user:${otherUserId}`).emit(
            "connectionUpdated",
            payloadForReceiver
          );
        }

        io.to(roomId).emit("messageReceived", populatedMsg);
      } catch (err) {
        console.error("sendMessage error:", err);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    socket.on("typing", ({ to }) => {
      if (!to) return;
      const roomId = getRoomId(userId, to);
      socket.to(roomId).emit("typing", { roomId, userId });
    });

    socket.on("stopTyping", ({ to }) => {
      if (!to) return;
      const roomId = getRoomId(userId, to);
      socket.to(roomId).emit("stopTyping", { roomId, userId });
    });

    socket.on("markAsRead", async ({ from }) => {
      if (!from) return;
      const otherUserId = from.toString();
      const roomId = getRoomId(userId, otherUserId);
      try {
        const res = await messageDb.updateMany(
          {
            roomId,
            readBy: { $ne: userId },
          },
          {
            $push: { readBy: userId },
          }
        );

        const conn = await Connection.findOneAndUpdate(
          { roomId },
          {
            $set: {
              [`unreadCounts.${userId}`]: 0,
            },
          },
          { new: true }
        ).populate("users", "name image");

        io.to(roomId).emit("messagesRead", {
          roomId,
          userId,
          modifiedCount: res.modifiedCount,
        });

        const updatedConn = (targetUserId) => {
          const otherUser = conn.users.find(
            (u) => u._id.toString() !== targetUserId.toString()
          );

          if (!otherUser) return null;

          return {
            _id: conn._id,
            user: otherUser,
            lastMessage: conn.lastMessage,
            lastMessageAt: conn.lastMessageAt,
            unreadCount: conn.unreadCounts?.get(targetUserId.toString()) || 0,
            roomId: conn.roomId,
          };
        };

        const payloadForSender = updatedConn(userId);
        const payloadForReceiver = updatedConn(otherUserId);

        if (payloadForSender) {
          io.to(`user:${userId}`).emit("connectionUpdated", payloadForSender);
        }
        if (payloadForReceiver) {
          io.to(`user:${otherUserId}`).emit(
            "connectionUpdated",
            payloadForReceiver
          );
        }
      } catch (err) {
        console.error("markAsRead error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id, "user:", userId);
      if (onlineUsers.has(userId)) {
        const set = onlineUsers.get(userId);
        set.delete(socket.id);
        if (set.size === 0) {
          onlineUsers.delete(userId);
          io.emit("userOffline", { userId });
        }
      }
    });
  });
  return io;
};

module.exports = initializeSocket;
