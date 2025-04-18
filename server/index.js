const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // allow client to connect

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or client URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
