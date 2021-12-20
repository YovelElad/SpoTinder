const { Router } = require('express');
const spotifyController = require('../controllers/spotifyController');

const spotifyRouter = new Router();

spotifyRouter.get('/callback', spotifyController.callback);
spotifyRouter.get('/url', spotifyController.getAuthorizationUrl);

module.exports = {spotifyRouter: spotifyRouter};