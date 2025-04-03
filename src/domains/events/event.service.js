const Events = require("./event.model");


class EventsService {
    static async createEvent(id, body) {
        const { name, description, location, date, price } = body;

        if(!name || !description || !location || !date || !price) throw new Error('name, description, location, date, or price can not be empty');
        
        return await Events.create({ name, description, location, date, price, artistId: id })
    }

    static async getEvents () {
        return await Events.find();
    }

    static async getEvent(id) {
        const findEvent = await Events.findById(id);

        if(!findEvent) throw new Error('event not found');

        return findEvent;
    }

    static async getArtistEvents(artistId) {
        const findEvent = await Events.find({ artistId });

        if(!findEvent) throw new Error('artist events not found');

        return findEvent;
    }

    static async updateEvent (id, body) {
        const { name, description, location, date, price, status } = body;
        const findEvent = await Events.findById(id);

        if(!findEvent) throw new Error('event not found');

        return await Events.findByIdAndUpdate({_id: id}, {
            name: name || findEvent.name,
            description: description || findEvent.description,
            location: location || findEvent.location,
            date: date || findEvent.date,
            price: price || findEvent.price,
            status: status || findEvent.status
        }, {
            new: true
        });

    }

    static async deleteEvent (id) {
        const findEvent = await Events.findById(id);

        if(!findEvent) throw new Error('event to be remove not found')

        return await Events.findByIdAndDelete({_id: id})
    }

}

module.exports = EventsService;