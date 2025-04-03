const axios = require('axios');
const { PAYSTACK_SECRET_KEY } = require('../../../config/envConfig');

class BookingHelper {
    static async initializePayment(email, amount) {
        try {
            const response = await axios.post('https://api.paystack.co/transaction/initialize', {
                // tx_ref: `tx_${Math.floor(Math.random() * 1000000)}`,
                email: email,
                amount: amount * 100, // Convert to kobo
                // currency: 'NGN',
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Payment initialization failed');
        }
    }

    static async verifyPayment(reference) {
        try {
            const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Payment verification failed');
        }
    }
}

module.exports = BookingHelper;