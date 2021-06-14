const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //blog name 
    blog_name: {
        type: String,
        required: true
    },
    blog_subject:{
        type: String
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);