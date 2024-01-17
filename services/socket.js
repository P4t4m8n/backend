const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Receiving an object from a user
    socket.on('send-object', (obj) => {
        console.log('Received object from user:', obj);

        // Broadcasting the object to other users
        socket.broadcast.emit('receive-object', obj);
    });

    // Sending a notification message to all users
    socket.on('send-notification', (message) => {
        io.emit('notification', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
