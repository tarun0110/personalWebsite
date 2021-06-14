const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Blog = require('../../models/Blog');

//create a blog
router.post('/',auth,  async (req,res) => {
    const {blog_name, blog_subject, content} = req.body;
    const blogFields = {};
    blogFields.user = req.user.id;
    if(blog_name) blogFields.blog_name = blog_name;
    if(blog_subject) blogFields.blog_subject = blog_subject;
    else blogFields.blog_subject = "";
    if(content) blogFields.content = content;

try{
    let blog = new Blog(blogFields);
    await blog.save();
    res.json(blog);
}catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
}
});



module.exports = router;
