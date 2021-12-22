const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { matchesRouter } = require('../routers/matchesRouter');

const usersRouter = new Router();
usersRouter.use('/:userId/matches', matchesRouter);
usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.post('/', usersController.createUser);

usersRouter.put('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.put('/like/:userId', usersController.addLike);
usersRouter.put('/match/:userId', usersController.addMatch);
usersRouter.put('/gender/:userId', usersController.setGender);

module.exports = { usersRouter };