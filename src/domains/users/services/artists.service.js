const HelperUtils = require("../../../genralUtils/helpers.util");
const Artist = require("../models/artists.model");

class ArtistsService {
    static async registerArtist (body) {
        const {firstName, lastName, bio, email, genre, role, pricePerEvent, password} = body;

        if( !firstName || !lastName || !email || !genre || !role || !pricePerEvent || !password ) throw new Error('firstName, lastName, email, genre, role, pricePerEvent or password can not be empty');

        const artistExist = await Artist.findOne({ email });

        if(artistExist) throw new Error('email already link to a account');

        const newArtist = new Artist({
            firstName,
            lastName,
            email,
            bio,
            genre,
            role,
            pricePerEvent,
            password
        });

        let artist = await newArtist.save();
        const token = await HelperUtils.generateToken(artist._id);
        return {
            ...artist._doc,
            token
        }

    }

    static async getArtists (objData) {
        return await Artist.find(objData);
    }

    static async getArtist (id) {
        const artist = await Artist.findById(id);

        if(!artist) throw new Error('artist not found');

        return artist;
    }

    static async updateArtist (id, body) {
        
        await HelperUtils.validateId(id, 'artist');

        const findArtist = await Artist.findById(id);

        if(!findArtist) throw new Error('artist not found');

        if(body.availability && body.availability.length > 0) {
            let _availability = findArtist.availability;

            for(let i = 0; i < body.availability.length; i++) {
                _availability.push(body.availability[i])
            }
            await findArtist.update({ _id: id },{
                $set: {
                    availability: _availability
                }
            });

            await findArtist.save();
        }

        return await Artist.findByIdAndUpdate({_id: id}, {
            firstName: body.firstName || findArtist.firstName,
            lastName: body.lastName || findArtist.lastName,
            bio: body.bio || findArtist.bio,
            genre: body.genre || findArtist.genre,
            pricePerEvent: body.pricePerEvent || findArtist.pricePerEvent
        }, { new: true})
    }

    static async deleteArtist (id) {
        await HelperUtils.validateId(id);

        return await Artist.findByIdAndDelete(id);
    }
}

module.exports = ArtistsService;