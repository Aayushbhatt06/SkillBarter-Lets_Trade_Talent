const { Server } = require("socket.io");
require("dotenv").config();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", (roomId) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ userId, roomId, text }) => {
      io.to(roomId).emit("messageReceived", {
        sender: userId,
        text,
      });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
