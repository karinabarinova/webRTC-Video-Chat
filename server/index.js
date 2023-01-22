require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

app.use(cors());
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Server is running...');
})

io.on('connection', (socket) => {
    socket.emit('me', socket.id);
    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnd');
    })
    socket.on('callUser', ({
        userIdToCall, signalData, from, name
    }) => {
        io.to(userIdToCall).emit('callUser', {
            signal: signalData,
            from,
            name
        })
    });
    socket.on('answerCall', ({ to, signal }) => {
        io.to(to).emit('callAccepted', signal)
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
