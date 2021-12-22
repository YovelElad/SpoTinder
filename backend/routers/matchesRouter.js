const { Router } = require('express');
const matchesController = require('../controllers/matchesController');

const matchesRouter = new Router({ mergeParams: true });

matchesRouter.get('/', matchesController.getAllMatchesOfUser);
matchesRouter.get('/:matchId', matchesController.getMatch);
matchesRouter.post('/', matchesController.addNewMatch);
matchesRouter.put('/:matchId', matchesController.updateMatch);
matchesRouter.delete('/:matchId', matchesController.deleteMatch);

module.exports = { matchesRouter: matchesRouter };