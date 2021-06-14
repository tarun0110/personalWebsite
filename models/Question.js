const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    visitor_name : {
        type:String
    },
    //email to
    question_to: {
        type: String
    },
    //email from
    question_from: {
        type: String
    },
    content_question: {
        type: String,
        required: true
    },
    content_answer: {
        type: String
        // default :""
    },
    subject:{
        type: String
    },
    timeStamp: {
        type : Date, 
        default: Date.now
    }
});

module.exports = Question = mongoose.model('question', QuestionSchema);