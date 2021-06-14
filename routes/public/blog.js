const express = require('express');
const router = express.Router();

const Blog = require('../../models/Blog');

//get all blogs
router.get('/', async (req,res) => {
    try{
        const blogs = await Blog.find();
        res.json(blogs);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

//get a blog by id
router.get('/:id', async (req,res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({ msg: 'Blog not found!'});
        }
        res.json(blog); 
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;