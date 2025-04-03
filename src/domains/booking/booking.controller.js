const ResponseHandler = require("../../apiResponseHandler/api.responseHandler");
const BookingService = require("./booking.service");

class BookingController {
    static async createBooking(req, res) {
        try {
            const {body, user} = req;

            const data = await BookingService.createBooking(user._id, body.eventId);

            ResponseHandler.success(res, 201, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getBookings(req, res) {
        try {

            const data = await BookingService.getBookings();

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getBooking(req, res) {
        try {
            const { params } = req;
            const data = await BookingService.getBooking(params.bookingId);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getUserBookings(req, res) {
        try {
            const { params } = req;
            const data = await BookingService.getUserBookings(params.userId);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async updateBooking(req, res) {
        try {
            const { params, body } = req;
            const data = await BookingService.updateBooking(params.bookingId, body);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        } 
    }

    static async userTransactions(req, res) {
        try {
            const { user } = req;
            console.log(req)
            const data = await BookingService.userTransactions(user);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        } 
    }

    static async bookingPayment(req, res) {
        try {
            const { params, body, user } = req;
            const data = await BookingService.bookingPayment(params.bookingId, body, user.email);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        } 
    }

    static async verifyPayment(req, res) {
        try {
            const { params } = req;

            const data = await BookingService.verifyPayment(params.bookingId);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }         
    }

}

module.exports = BookingController;