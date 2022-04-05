const express = require("express");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

const onConnection = (socket) => {
    console.log("Socket IO connection");

    //lắng nghe event fireToServer
    socket.on("fireToServer", (message) => {
        // gửi cho tất cả client
        io.sockets.emit("fireEventToClient", message);
    });

    //lắng nghe event broadcastToServer
    socket.on("broadcastToServer", (message) => {
        // gửi cho tất cả client ngoại trừ client hiện tại
        socket.broadcast.emit("fireEventToClient", message);
    });

    //lắng nghe event privateEventToServer
    socket.on("privateEventToServer", (message) => {
        // chỉ gửi event cho client hiện tại
        socket.emit("fireEventToClient", message);
    });

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    io.engine.on("connection_error", (err) => {
        console.log("Socket IO Connection Error"); // the request object
        console.log(err.req); // the request object
        console.log(err.code); // the error code, for example 1
        console.log(err.message); // the error message, for example "Session ID unknown"
        console.log(err.context); // some additional error context
    });

};

io.on("connection", onConnection);

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});
