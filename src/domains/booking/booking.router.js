const express = require('express');
const { isAuth } = require('../../middleware/auth.middleware');
const BookingController = require('./booking.controller');

const BookingRouter = express.Router();

BookingRouter.post('/', BookingController.createBooking);
BookingRouter.get('/', BookingController.getBookings);
BookingRouter.get('/:bookingId', BookingController.getBooking);
BookingRouter.get('/user/:userId', BookingController.getUserBookings);
BookingRouter.post('/:bookingId/payment', BookingController.bookingPayment);
BookingRouter.get('/:bookingId/payment/verify', BookingController.verifyPayment);
BookingRouter.get('/user/transaction-history', BookingController.userTransactions)
BookingRouter.patch('/:bookingId', BookingController.updateBooking);

module.exports = BookingRouter;