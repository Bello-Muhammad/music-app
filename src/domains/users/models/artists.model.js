const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Event = require('../../events/event.model');



const ArtistSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    availability: [],
    pricePerEvent: {
        type: Number,
        required: true
    },
    // socialLinks:,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    
},{
    timestamps: true
});

ArtistSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'artistId'
});

ArtistSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password

	return userObject;
};

ArtistSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;