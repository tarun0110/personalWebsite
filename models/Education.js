const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //school name 
    school_name: {
        type: String,
        required: true
    },
    qualification: {
        type: String
    },
    description: {
        type: String
    },
    year_from : {
        type: Date
    },
    year_to : {
        type: Date
    }
});

module.exports = Education = mongoose.model('education', EducationSchema);