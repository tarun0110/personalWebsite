const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    location_from: {
        type: String,
        required: true,
    },
    location_to: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    journeyTime: {
        type: Number,
        required: true,
    },

    fare: {
        type: Number,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    booked: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
});

module.exports = Bus = mongoose.model('bus', UserSchema);
