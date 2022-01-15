require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
const auth  = require('./modules/auth.js');
const cors = require('cors')

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
    });

const { usersRouter } = require('./routers/usersRouter');
const { spotifyRouter } = require('./routers/spotifyRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use('/users', usersRouter);
app.use('/spotify', spotifyRouter);
app.post('/login', auth.login);
app.get('/', function(req, res) {
    res.sendFile('./test.html', { root: __dirname });
    });
app.all('*', (req, res) => {
    res.json({ status: false, message: 'Route not found' });
});

io.on('connection', function(socket) {
    const id = socket.handshake.query.id;
    console.log('A user connected: ' + id);
    socket.join(id);

    socket.on('send-message', function(data) {
        console.log(data.message);
        console.log(data.recipient);
        socket.to(data.recipient).emit('receive-message', {sender: id, data: data.message});
    });

    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

 });


http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});