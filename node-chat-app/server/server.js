const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // set path root to public/index.html

io.on('connection', (socket) => {
    console.log('new user connected');

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

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }

        socket.join(params.room);
        // socket.leave('the room to leave');

        // target users
        // io.emit -> emit to every single connected user
        // socket.broadcast.emit -> emit to everyone connected to the socket server except the current user
        // socket.emit -> emit specifically to one user

        // emissions to chat rooms
        // io.emit -> io.to('chat room').emit
        // socket.broadcast.emit -> socket.broadcast.to('chat room').emit

        socket.emit('newMessage', generateMessage('admin', 'welcome to the chat'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`));

        callback();
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