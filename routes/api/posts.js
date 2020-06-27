const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../../model/Users');
const Post = require('../../model/Post');
const Profile = require('../../model/Profile');



// @route POST api/posts
// @desc Create Post
// @access Private

router.post('/',[auth,[
    check('text','Text is required').not().isEmpty(),
]],async(req,res) => {
    const error = await validationResult(req);

    if(!error.isEmpty)
    {
        return res.status(400).json({ error : error.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        };

        const post = new Post(newPost);

        await post.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route GET api/posts
// @desc GET all posts
// @access Private

router.get('/',auth,async(req,res) =>{
    try {
        const posts = await Post.find().sort({ date : -1});

        res.json(posts);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route GET api/posts/:id
// @desc GET post by id
// @access Private

router.get('/:id',auth,async(req,res) =>{
    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg : 'No Post Found'});
        }

        res.json(post);
        
    } catch (error) {
        console.error(err.message);

        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg : 'There is no Post for this User'});
        }
 
        res.status(500).send('Server error');
    }
});

// @route DELETE api/post/:id
// @desc Delete Posts
// @access Private

router.delete('/:id',auth,async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg : 'No Post Found'});
        }
        // Check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).send('User not authorized');
        }
        
        await post.remove();

        res.json({msg : 'Post removed'});
        
    } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg : 'There is no Post for this User'});
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route PUT api/post/like/:id
// @desc PUT Posts
// @access Private

router.put('/like/:id',auth,async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg : 'Already liked'});
        }

        post.likes.unshift({user : req.user.id});
        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');   
    }
});


// @route PUT api/post/unlike/:id
// @desc PUT Posts
// @access Private

router.put('/unlike/:id',auth,async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg : 'Post not yet liked'});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex,1);
        
        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');   
    }
});


// @route POST api/posts/comment/:id
// @desc  Post comment
// @access Private

router.post('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty(),
]],async(req,res) => {
    const error = await validationResult(req);

    if(!error.isEmpty)
    {
        return res.status(400).json({ error : error.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route DELETE api/post/comment/:id/:comment_id
// @desc Delete comment
// @access Private

router.delete('/comment/:id/:comment_id',auth,async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment){
            return res.status(400).json({msg : 'Comment Doesnt exist'})
        }

        //Check user

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg : 'User is not authorized'});
        }
 
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex,1);
        
        await post.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;