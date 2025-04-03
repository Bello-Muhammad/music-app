const HelperUtils = require("../../genralUtils/helpers.util");
const bcrypt = require('bcrypt');
const User = require("../users/models/users.model");
const Artist = require("../users/models/artists.model");

class AuthService {
    static async login(body) {
        const { email, password} = body;

        const findUser = await User.findOne({ email });
        const findArtist = await Artist.findOne({ email });

        if (findUser && !findArtist) {

            const isMatch = await bcrypt.compare(password, findUser.password)
        
            if(!isMatch) {
                throw new Error("invalid password")
            }

            const token = HelperUtils.generateToken(findUser._id);

            return {
                ...findUser,
                token
            }
        } else if (!findUser && findArtist) {
            const isMatch = await bcrypt.compare(password, findArtist.password)
        
            if(!isMatch) {
                throw new Error("invalid password")
            }

            const token = HelperUtils.generateToken(findArtist._id);

            return {
                ...findArtist,
                token
            }
        } else {
            throw new Error('invalid email or password')
        }
    }
}

module.exports = AuthService;