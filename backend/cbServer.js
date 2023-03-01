const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

const { Server } = require("socket.io");

const io = new Server(3007, {
  cors: {
    origin: "*",
  },
});

let rooms = [];
let userMap = [];
let adminmap = [];
io.on("connection", (socket) => {
  socket.emit("connection", "hello from server");
  socket.on("newUser", function (room, msg) {
    // console.log("newUser");
    if (rooms.indexOf(room) === -1) {
      rooms.push(room);
      userMap[socket.id] = room.id;
      // console.log("Usermap::::", userMap);
      socket.broadcast.emit("newRooms", JSON.stringify(rooms));
    }
    socket.join(room);
    // console.log("msg::::", msg);
    socket.broadcast.to(room).emit("msg", msg);
  });

  socket.on("newAdmin", function (room, msg) {
    // console.log("newAdmin");
    if (rooms.indexOf(room) === -1) {
      rooms.push(room);
      adminmap[socket.id] = room;
      // console.log("adminmap::::", adminmap);
    }
    socket.join(room);
    // console.log("msg::::", msg);
    socket.broadcast.to(room).emit("msg", msg);
  });
  socket.on("recieve", (room, message) => {
    // console.log(message);
    socket.broadcast.to(room).emit("msg", message);
  });
  socket.on("message", (room, message) => {
    // console.log(message);
    // console.log("Currrom::::", room);
    socket.broadcast.to(room).emit("message", message);
  });
  socket.on("adminmsg", (room, message) => {
    // console.log("adminmsg " + message);
    socket.broadcast.emit("msg", { id: room, message: message });
  });
  socket.on("recieve222", (message) => {
    socket.broadcast.emit("recieve", message);
  });
  socket.on("disconnect", function () {
    let x = userMap[socket.id];
    // console.log("remove " + x);
    let pos = rooms.map((e) => e.id).indexOf(x);
    rooms.splice(pos, 1);
    if (x != undefined) {
      delete userMap[socket.id];
    } else {
      delete adminmap[socket.id];
    }
    // console.log("After dlete Rooms", rooms);
    // console.log("After dlete users", userMap);
    // console.log(socket.id + " Got disconnected!");
    socket.broadcast.emit("DisconnectAdmin", JSON.stringify(rooms));
  });
});
