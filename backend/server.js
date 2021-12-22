require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
const auth  = require('./modules/auth.js');
var cors = require('cors')

const { usersRouter } = require('./routers/usersRouter');
const { spotifyRouter } = require('./routers/spotifyRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use('/users', usersRouter);
app.use('/spotify', spotifyRouter);
app.post('/login', auth.login);

app.all('*', (req, res) => {
    res.json({ status: false, message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});