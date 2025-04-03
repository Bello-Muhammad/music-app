const express = require('express');
const UsersRouter = require('../domains/users/user.router');
const AuthRouter = require('../domains/auth/auth.router');
const EventRouter = require('../domains/events/event.router');
const BookingRouter = require('../domains/booking/booking.router');
const { isAuth, authPage } = require('../middleware/auth.middleware');

const AppRouter = express.Router();

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/users', isAuth, UsersRouter);
AppRouter.use('/events', isAuth, authPage(['admin', 'artist']), EventRouter);
AppRouter.use('/bookings', isAuth, BookingRouter);

module.exports = AppRouter;