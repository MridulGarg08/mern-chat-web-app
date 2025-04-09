import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // {userId: socketId}s

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

// const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("typing", ({ to }) => {
		console.log(`Typing event from ${userId} to ${to}`);
		const receiverSocketId = userSocketMap[to];
		console.log("Receiver socket ID:", receiverSocketId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("typing");
		}
	});

	socket.on("stopTyping", ({ to }) => {
		console.log(`StopTyping event from ${userId} to ${to}`);
		const receiverSocketId = userSocketMap[to];
		console.log("Receiver socket ID:", receiverSocketId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("stopTyping");
		}
	});

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };