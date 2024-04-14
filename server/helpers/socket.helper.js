const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const getReceiverSocketId = (receiverId) => {
	return userSocket[receiverId];
};

const userSocket = {};

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	if (userId) {
		userSocket[userId] = socket.id;
	}
	console.log("A user connected", socket.id);

	io.emit("getOnlineUsers", Object.keys(userSocket));

	socket.on("disconnect", () => {
		console.log("A user disconnected", socket.id);
		delete userSocket[userId];
		io.emit("getOnlineUsers", Object.keys(userSocket));
	});
});

module.exports = { app, server, io, getReceiverSocketId };
