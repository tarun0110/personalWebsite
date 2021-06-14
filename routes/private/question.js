const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Question = require('../../models/Question');

//get all questions
router.get('/', auth,  async (req,res)=>{
    try{
        const questions = await Question.find();
        res.json(questions);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//get a question by question id
router.get('/:id', auth,  async (req,res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({ msg: 'Question not found!'});
        }
        res.json(question); 
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//to answer the question
router.post('/ans/:id', auth,  async (req,res) => {
    try{
        let question = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({ msg: 'Question not found!'});
        }
        question.content_answer = req.body.content_answer;
        await question.save();
        res.json(question); 
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;