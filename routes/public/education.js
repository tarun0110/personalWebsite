const express = require('express');
const router = express.Router();

const Education = require('../../models/Education');

//get all educations
router.get('/', async (req,res) => {
    try{
        const educations = await Education.find();
        res.json(educations);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//get a education by edu id
router.get('/:id', async (req,res) => {
    try{
        const education = await Education.findById(req.params.id);
        if(!education) {
            return res.status(404).json({ msg: 'Education not found!'});
        }
        res.json(education); 
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;