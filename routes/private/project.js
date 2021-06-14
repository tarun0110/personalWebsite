const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

//create a project
router.post('/',auth,  async (req,res) => {
    const {project_name, description, url_link, github_link} = req.body;
    const projectFields = {};
    projectFields.user = req.user.id;
    if(project_name) projectFields.project_name = project_name;
    if(description) projectFields.description = description;
    if(url_link) projectFields.url_link = url_link;
    else projectFields.url_link = "";
    if(github_link) projectFields.github_link = github_link;
    else  projectFields.github_link="";

try{
    let project = new Project(projectFields);
    await project.save();
    res.json(project);
}catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
}
});



module.exports = router;