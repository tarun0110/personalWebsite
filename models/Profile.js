const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    company: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    friends: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user' 
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);