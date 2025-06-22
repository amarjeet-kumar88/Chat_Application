import { createServer } from "node:http";
import { Server } from "socket.io";
import 'dotenv/config';

const port = parseInt(process.env.PORT || "5000", 10);
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    console.log(`User ${username} joined room ${room}`);
    socket.to(room).emit("user_joined", `${username} joined room ${room}`);
  });

  socket.on("message", ({ room, message, sender }) => {
    console.log(`Message from ${sender} in room ${room}: ${message}`);
    socket.to(room).emit("message", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Socket.IO server running on port ${port}`);
});
