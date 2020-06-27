const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

router.post('/',
    [
        check('name','Name is Required').not().isEmpty(),
        check('email','Please include valid email').isEmail(),
        check('password','Please enter a pwd with 6 or more characters').isLength({min : 6})
    ],
    async (req,res) => {
        const error = validationResult(req);

        if(!error.isEmpty())
        {
            return res.status(400).json({ error :error.array()});
        }

        const {name,email,password} = req.body;
        try {
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({ error : [{msg : 'User already exists'}]})
            }

            const avatar = gravatar.url(email,{ s: '200', r:'pg', d:'mm'});

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password =  await bcrypt.hash(password,salt);

            await user.save();

            const payload = {
                user:{
                    id : user.id
                }
            }

            jwt.sign(payload,config.get('jwtSecret'), { expiresIn : 360000}, (err,token) =>{
                if(err) throw err;
                res.json({ token });
            });
            //res.send('User register');
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }     
});

module.exports = router; 