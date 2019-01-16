const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // set path root to public/index.html

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // emit to all users, including emitter
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(); // acknowledge message from the server

        // broadcast: emit to all users except the emitter
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected')
    });
});

server.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});