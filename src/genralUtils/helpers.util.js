const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { JWT_SECRET, JWT_LIFE } = require('../config/envConfig');

class HelperUtils {

    static validateId (id) {
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if(!isValid) throw new Error('data not found');

        return;
    }

    static async generateToken (_id) {
        return await jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_LIFE });
    }
}

module.exports = HelperUtils