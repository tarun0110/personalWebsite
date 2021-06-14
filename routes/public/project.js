const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Project = require('../../models/Project');

//get all projects
router.get('/', async (req,res) => {
    try{
        const projects = await Project.find();
        res.json(projects); 
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//get a project by id
router.get('/:id', async (req,res) => {
    try{
        const project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({ msg: 'Project not found!'});
        }
        res.json(project); 
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;

