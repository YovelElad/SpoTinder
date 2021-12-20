const { Router } = require('express');
const spotifyController = require('../controllers/spotifyController');

const spotifyRouter = new Router();

spotifyRouter.get('/callback', spotifyController.callback);

module.exports = {spotifyRouter: spotifyRouter};