const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Education = require('../../models/Education');

//create an edu
router.post('/',auth,  async (req,res) => {
    const {school_name, qualification, description, year_from, year_to} = req.body;
    const educationFields = {};
    educationFields.user = req.user.id;
    if(school_name) educationFields.school_name = school_name;
    if(qualification) educationFields.qualification = qualification;
    else educationFields.qualification = "";
    if(description) educationFields.description = description;
    else educationFields.description = "";
    if(year_from) educationFields.year_from = year_from;
    else educationFields.year_from = new Date(2018,7);
    if(year_to) educationFields.year_to = year_to;
    else educationFields.year_to = new Date(2022,5);


try{
    let education = new Education(educationFields);
    await education.save();
    res.json(education);
}catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
}
});



module.exports = router;