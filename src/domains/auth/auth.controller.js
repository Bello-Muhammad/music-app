const ResponseHandler = require("../../apiResponseHandler/api.responseHandler");
const UsersService = require("../users/services/adminConsumer.service");
const ArtistsService = require("../users/services/artists.service");
const AuthService = require("./auth.service");

class AuthController {

    static async register (req, res) {
        
        const { body } = req;
        
        try {
            
            if(body.role === 'artist') {
                const data = await ArtistsService.registerArtist(body);

                ResponseHandler.success(res, 201, data);
            } else if(body.role === 'admin' || body.role === 'customer') {
                const data = await UsersService.registerUser(body);

                ResponseHandler.success(res, 201, data);
            } else {
                throw new Error('invalid role')
            }

        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async login (req, res) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login(email, password);

            ResponseHandler.success(res, 200, data)
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

}

module.exports = AuthController;