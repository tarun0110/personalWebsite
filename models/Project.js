const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //project name 
    project_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url_link : {
        type: String
    },
    github_link : {
        type: String
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);