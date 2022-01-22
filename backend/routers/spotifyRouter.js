const { Router } = require('express');
const spotifyController = require('../ontrollers/spotifyController');
const auth  = require('../modules/auth.js');

const spotifyRouter = new Router();

spotifyRouter.get('/callback', spotifyController.callback);
spotifyRouter.get('/login/:userId',[auth.verifyToken], spotifyController.login);

module.exports = {spotifyRouter: spotifyRouter};