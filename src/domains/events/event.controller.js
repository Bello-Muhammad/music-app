const ResponseHandler = require("../../apiResponseHandler/api.responseHandler");
const EventsService = require("./event.service");

class EventsController {
    static async createEvent(req, res) {
        try {
            const { body, user} = req;
            const data = await EventsService.createEvent(user._id, body)

            ResponseHandler.success(res, 201, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getEvents(req, res) {
        try {            
            const data = await EventsService.getEvents()

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }
    
    static async getEvent(req, res) { 
         try {   
            const { params } = req
            const data = await EventsService.getEvent(params.eventId)

            ResponseHandler.success(res, 200, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async getArtistEvents(req, res) { 
        try {   
           const { params } = req
           const data = await EventsService.getArtistEvents(params.artistId)

           ResponseHandler.success(res, 200, data);
       } catch (error) {
           if (error instanceof Error) {
               ResponseHandler.error(res, 400, error.message);
           }else{
               ResponseHandler.error(res, 500, 'internal error')
           }
       }
   }

    static async updateEvent(req, res) {
        try {   
            const { params, body } = req
            const data = await EventsService.updateEvent(params.eventId, body)

            ResponseHandler.success(res, 201, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }

    static async deleteEvent(req, res) {
        try {   
            const { params } = req
            const data = await EventsService.deleteEvent(params.eventId)

            ResponseHandler.success(res, 201, data);
        } catch (error) {
            if (error instanceof Error) {
                ResponseHandler.error(res, 400, error.message);
            }else{
                ResponseHandler.error(res, 500, 'internal error')
            }
        }
    }
}

module.exports = EventsController;