const mongoose = require('mongoose');
const BookingTransaction = require('./bookingTransaction.model');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    }
},{
    timestamps: true
})

BookingSchema.virtual('bookingTransaction', {
    ref: 'BookingTransaction',
    localField: '_id',
    foreignField: 'bookingId'
})

const Booking = new mongoose.model('Booking', BookingSchema);

module.exports = Booking;