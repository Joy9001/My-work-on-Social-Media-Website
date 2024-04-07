const express = require('express');
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const userSocket = {};

io.on("connection", (socket) => {
    // console.log("A user connected", socket.id);

    const { userId } = socket.handshake.query;
    if (userId) {
        userSocket[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocket));

    socket.on("disconnect", () => {
        // console.log("A user disconnected", socket.id);
        delete userSocket[userId];

        io.emit("getOnlineUsers", Object.keys(userSocket));
    });
});

module.exports = { app, server, io };