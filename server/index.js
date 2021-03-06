const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors'); 

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/api/login', (req, res, next) => {
    const { name, room } = req.body;
    console.log('HOLA MUNDO');
    const { user, error } = addUser({ id: name + room, name, room })
    res.json({ user, error });
});

io.on('connect', (socket) => {
    console.log('Conectado');
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        
        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback()
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
    });
});

server.listen(process.env.PORT || 5000, () => console.log(`server is running in localhost:5000`));