const { Router } = require('express');
const matchesController = require('../controllers/matchesController');
const auth  = require('../modules/auth.js');

const matchesRouter = new Router({ mergeParams: true });

matchesRouter.get('/', matchesController.getAllMatchesOfUser);
matchesRouter.get('/:matchId', matchesController.getMatch);
matchesRouter.post('/',[auth.isPaid], matchesController.addNewMatch);
matchesRouter.put('/:matchId',[auth.isPaid], matchesController.updateMatch);
matchesRouter.delete('/:matchId',[auth.isPaid], matchesController.deleteMatch);

module.exports = { matchesRouter: matchesRouter };