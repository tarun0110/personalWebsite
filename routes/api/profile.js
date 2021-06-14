const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


// get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get profile 
router.get('/me', auth, async (req, res) => {
     try {  
         const profile = await Profile.findOne({ user: req.user.id } ).
         populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

         res.json(profile);
     }
     catch(err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
});

// create or update profile for a user 
router.post('/', 
        [auth, 
            [
                check('status', 'status is required').not().isEmpty()
            ]
        ], 
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                company, 
                location,
                status,
                bio
            } = req.body

            const profileFields = {};

            profileFields.user = req.user.id;
            if(company) profileFields.company = company;
            if(location) profileFields.location = location;
            if(status) profileFields.status = status;
            if(bio) profileFields.bio = bio;

            try {

                let profile = await Profile.findOne({ user: req.user.id } ).
                populate('user', ['name', 'avatar']);

                if(profile) {
                    profile = await Profile.findOneAndUpdate(
                        { user: req.user.id }, 
                        { $set: profileFields},
                        { new: true }
                    );

                return res.json(profile);
                }

                profile = new Profile(profileFields);

                await profile.save();

                res.json(profile);

            }
            catch(err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
    );

// get profile by userID 
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).
        populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'profile not found' });
        res.json(profile);
    } 
    catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'profile not found' });
        }
        res.status(500).send('Server Error')
    }
});

//delete account 
router.delete('/', auth, async (req, res) => {
    try {

        await Post.deleteMany({ user: req.user.id });

        await Profile.findOneAndDelete({ user: req.user.id });

        await User.findOneAndDelete({ _id: req.user.id });   

        res.json( { msg: 'user deleted' } );
        
    } 
    catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

//add a friend 
router.put('/friend/:id', auth, async (req, res) => {
    try {
        // user profile who is currently logged in
        const profile = await Profile.findOne({ user: req.user.id }).
        populate('user', ['name', 'avatar']);

        // check if the post has already been liked by the user
        if(profile.friends.filter(friend => friend.user.toString() === req.params.id).length > 0) {
            return res.status(400).json({ msg: 'already friend'});
        }

        profile.friends.unshift( { user: req.params.id } );

        await profile.save();
        
        res.json({msg: 'added friend'});
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');    
    }
});

router.put('/unfriend/:id', auth, async (req, res) => {
    try {
        // user profile who is currently logged in
        const profile = await Profile.findOne({ user: req.user.id }).
        populate('user', ['name', 'avatar']);

        if(profile.friends.filter(friend => friend.user.toString() === req.params.id).length === 0) {
            return res.status(400).json({ msg: 'not your friend'});
        }

        const index = profile.friends.map(friend => friend.user.toString()).indexOf(req.params.id);
        profile.friends.splice(index, 1);

        await profile.save();
        
        res.json({msg: 'removed friend'});
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');    
    }
});


module.exports = router;