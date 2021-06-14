const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Question = require('../../models/Question');

//create a question (this is public)
router.post('/',  async (req,res) => {
    const {visitor_name, question_from, subject, content_question} = req.body;
    const questionFields = {};
    const user = await User.find();

    questionFields.question_to = user[0].email;
    if(visitor_name) questionFields.visitor_name = visitor_name;
    if(question_from) questionFields.question_from = question_from;
    if(subject) questionFields.subject = subject;
    if(content_question) questionFields.content_question = content_question;
    
    try{
        let question = new Question(questionFields);
        await question.save();
        res.json(question);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;