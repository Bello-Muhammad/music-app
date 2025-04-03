const ResponseHandler = require("../../../apiResponseHandler/api.responseHandler");
const UsersService = require("../services/adminConsumer.service");


class UsersController {
    static async registerUser(req, res) {
        try {
            const { body } = req;
            const data = await UsersService.registerUser(body);

            ResponseHandler.success(res, 201, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getUsers(req, res) {
        try {

            const data = await UsersService.getUsers();

            ResponseHandler.success(res, 200, data);

        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getUser(req, res) {
        try {
            const { params } = req;
            const data = await UsersService.getUser(params.userId);

            ResponseHandler.success(res, 200, data)
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async updateUser(req, res) {
        try {
            const { body, params } = req;
            const data = await UsersService.updateUser(params.userId, body);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async deleteUser(req, res) {
        try {
            const { params } = req;
            const data = await UsersService.deleteUser(params.userId);

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

module.exports = UsersController;