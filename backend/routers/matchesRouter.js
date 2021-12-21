const { Router } = require('express');
const matchesController = require('../controllers/matchesController');

const matchesRouter = new Router();

matchesRouter.get('/', matchesController.getAllMatchesOfUser);
matchesRouter.get('/:id', matchesController.getMatch);
matchesRouter.post('/', matchesController.addNewMatch);
matchesRouter.put('/:id', matchesController.updateMatch);
matchesRouter.delete('/:id', matchesController.deleteMatch);


module.exports = { matchesRouter: matchesRouter };