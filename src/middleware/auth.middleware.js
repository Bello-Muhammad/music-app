const jwt = require('jsonwebtoken');
const Artist = require('../domains/users/models/artists.model');
const User = require('../domains/users/models/users.model');
const ResponseHandler = require('../apiResponseHandler/api.responseHandler');
const { JWT_SECRET } = require('../config/envConfig');

const isAuth = async (req, res, next) => {
    try {
        if(!req.headers.authorization) throw new Error('user not login');

        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const body = { _id: decoded._id }
        const findArtist = await Artist.findById(body);
        const findUser = await User.findById(body);

        if(findArtist && !findUser) {
            req.user = findArtist
        } else if (findUser && !findArtist) {
            req.user = findUser
        } else {
            throw new Error('invalid authentication')
        }

        next()
    } catch (error) {
        
        if (error instanceof Error) {
            ResponseHandler.error(res, 400, error.message);
        }else{
            ResponseHandler.error(res, 500, 'internal error')
        }
    }
}

const authPage = (permissions) => {
    return (req, next) => {
        const role = req.user.role;
        if(permissions.includes(role)) {
            next();
        }else{
            throw new Error('you not authorized to use this endpoint')
        }
    }
};


module.exports = {
    isAuth,
    authPage
}