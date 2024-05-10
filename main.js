const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8000;

app.get("/", (req, res) => {
  console.log("get request made");
  res.sendFile(__dirname + "/src/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // client id and server id matches with each other
  console.log(`client id: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });

  socket.on("client", (msg) => {
    console.log(`client: ${msg}`);
  });

  socket.emit("server", "hey plain html");
});

server.listen(8000, () => {
  console.log(`listening on port ${port}`);
});
