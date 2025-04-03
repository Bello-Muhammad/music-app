const mongoose = require('mongoose');

const BookingTransactionSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    transactionRef: {
        type: String,
        required: false
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    amount: {
        type: Number,
        required: false
    },
    createdAt: {
        type: String,
        default: Date.now
    }
});

const BookingTransaction = new mongoose.model('BookingTransaction', BookingTransactionSchema);

module.exports = BookingTransaction;