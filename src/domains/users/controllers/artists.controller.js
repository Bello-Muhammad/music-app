const ResponseHandler = require("../../../apiResponseHandler/api.responseHandler");
const ArtistsService = require("../services/artists.service");

class ArtistsController {
    static async registerArtist(req, res) {
        try {
            const { body } = req;
            const data = await ArtistsService.registerArtist(body);

            ResponseHandler.success(res, 201, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getArtists(req, res) {
        try {
            const {query} = req;
            let objData = {};

            if(query.genre) objData.genre = query.genre;

            const data = await ArtistsService.getArtists(objData);

            ResponseHandler.success(res, 200, data);

        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getArtist(req, res) {
        try {
            const { params} = req;
          
            const data = await ArtistsService.getArtist(params.artistId);

            ResponseHandler.success(res, 200, data)
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async updateArtist(req, res) {
        try {
            const { params, body } = req;
            const data = await ArtistsService.updateArtist( params.artistId, body);

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async deleteArtist(req, res) {
        try {
            const { params } = req;
            const data = await ArtistsService.deleteArtist(params.artistId);

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

module.exports = ArtistsController;