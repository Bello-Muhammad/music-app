const express = require('express');
const ArtistsController = require('./controllers/artists.controller');
const UsersController = require('./controllers/adminConsumer.controller');
const { authPage } = require('../../middleware/auth.middleware');

const UsersRouter = express.Router();

//>>>artist routes start here
// UsersRouter.post('/artist', ArtistsController.registerArtist);
UsersRouter.get('/artists', authPage(['admin']), ArtistsController.getArtists);
UsersRouter.get('/artist/:artistId', authPage(['admin', 'artist']), ArtistsController.getArtist);
UsersRouter.patch('/artist/:artistId', authPage(['admin', 'artist']), ArtistsController.updateArtist);
UsersRouter.delete('/artist/:artistId', authPage(['admin', 'artist']), ArtistsController.deleteArtist)

//>>>admn and cosumer endpoint start here
// UsersRouter.post('/', UsersController.registerUser);
UsersRouter.get('/', authPage(['admin']), UsersController.getUsers);
UsersRouter.get('/:userId', authPage(['admin', 'customer']), UsersController.getUser);
UsersRouter.patch('/:userId', authPage(['admin', 'customer']), UsersController.updateUser);
UsersRouter.delete('/:userId', authPage(['admin', 'customer']), UsersController.deleteUser)

module.exports = UsersRouter;