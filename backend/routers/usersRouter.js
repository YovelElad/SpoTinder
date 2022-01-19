const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { matchesRouter } = require('../routers/matchesRouter');
const auth  = require('../modules/auth.js');

const usersRouter = new Router();
usersRouter.use('/:userId/matches',[auth.isPaid], matchesRouter);
usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);

module.exports = { usersRouter };