const express = require('express');
const EventsController = require('./event.controller');
const { isAuth } = require('../../middleware/auth.middleware');

const EventRouter = express.Router();

EventRouter.post('/create-event', isAuth, EventsController.createEvent);
EventRouter.get('/', EventsController.getEvents);
EventRouter.get('/:eventId', EventsController.getEvent);
EventRouter.get('/artist/:artistId', isAuth, EventsController.getArtistEvents);
EventRouter.patch('/:eventId', isAuth, EventsController.updateEvent);
EventRouter.delete('/:eventId', isAuth, EventsController.deleteEvent);

module.exports = EventRouter;