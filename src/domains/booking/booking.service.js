const HelperUtils = require("../../genralUtils/helpers.util");
const Events = require("../events/event.model");
const User = require("../users/models/users.model");
const Booking = require("./model/booking.model");
const BookingTransaction = require("./model/bookingTransaction.model");
const BookingHelper = require("./utils/booking.util");

class BookingService {
    static async createBooking(userId, eventId) {
        
        const userExist = await User.findById({ _id: userId });
        const eventExist = await Events.findById({ _id: eventId });

        if(!userExist) throw new Error('user not found');

        if(!eventExist) throw new Error('event not found');

        const booking = await Booking.create({userId, eventId});

        await BookingTransaction.create({
            bookingId: booking._id   
        });

        return booking;
    }

    static async getBookings() {
        return await Booking.find();
    }

    static async getBooking(id) {
        await HelperUtils.validateId(id)

        const book = await Booking.findById(id)

        if(!book) throw new Error('event booking not found');
        
        return book;
    }

    static async getUserBookings(userId) {
        await HelperUtils.validateId(userId);

        const user = await User.findById({_id: userId});

        if(!user) throw new Error('user not found');

        return await Booking.find({ userId })
    }

    static async updateBookings(bookingId, body) {
    
        const findBooking = await Booking.findById({ _id: bookingId });

        if(!findBooking) throw new Error('Booking not found');

        findBooking.status = body.status;

        await findBooking.save();

        return { message: 'Booking status updated'}
    }

    static async bookingPayment(bookingId, body, email) {
        const { amount } = body;

        const payment = await BookingHelper.initializePayment(email, amount);

        await BookingTransaction.findOneAndUpdate({ bookingId }, { transactionRef: payment.data.reference }, { new: true });

        return payment.data;
    }

    static async verifyPayment(bookingId) {
        const booking = await BookingTransaction.findOne({ bookingId });

        if(!booking) throw new Error('transaction not found');

        const bookedEvent = await Booking.findById({ _id: bookingId });

        if(!bookedEvent) throw new Error('booked event not found');

        const verifyData = await BookingHelper.verifyPayment(booking.transactionRef);

        if(verifyData.data.status === 'success') {
            booking.status = 'success';
            booking.amount = verifyData.data.amount

            bookedEvent.paymentStatus = 'paid';

            await booking.save();
            await bookedEvent.save();
        } else {
            booking.status = 'success';
            booking.amount = verifyData.data.amount

            bookedEvent.paymentStatus = 'failed';

            await booking.save();
            await bookedEvent.save();
        }

        return { paymentStatus: bookedEvent.paymentStatus }

    }

    static async userTransactions(user) {
        // console.log(user)
        const booking = await Booking.findById({ userId: user._id});
        const match = { bookingId: booking._id};
        await booking.populate({ 
            path: 'bookingTransaction',
            match
        }).execPopulate();

        return booking.BookingTransaction
    }

}

module.exports = BookingService;