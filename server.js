const express = require("express");
const app = express();
const server = require("http").createServer(app);
const redis = require("redis");

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

/* const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    password: "",
});

(async () => {
    await redisClient.connect();
})(); */

const onConnection = async (socket) => {
    console.log("Socket IO connection");

    const redisClient = redis.createClient();
    await redisClient.connect()

    redisClient.subscribe("PUBLIC_BROADCAST", (data, channel) => {
        const response = JSON.parse(data);
        socket.join(response.data.room);
        socket.to(response.data.room).emit(response.event, response.data)
    });

    socket.on("joinRoom", (room) => {
        // Joining a room
        socket.join(room);
    });

    //lắng nghe event fireToServer
    socket.on("fireToServer", (message) => {
        // gửi cho tất cả client
        io.emit("fireEventToClient", message);
    });

    //lắng nghe event broadcastToServer
    socket.on("broadcastToServer", (message) => {
        // gửi cho tất cả client ngoại trừ client hiện tại
        socket.broadcast.emit("fireEventToClient", message);
    });

    //lắng nghe event privateEventToServer
    socket.on("privateEventToServer", (socketId, message) => {
        // chỉ gửi event cho client hiện tại
        io.to(socketId).emit("fireEventToClient", message);
    });

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
        redisClient.quit();
    });
};

io.on("connection", onConnection);

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});
