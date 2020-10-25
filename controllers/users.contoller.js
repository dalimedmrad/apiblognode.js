const  User = require('../models/user'); 
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const config = require('config');
const { use } = require('../routes/users');
const boom = require('boom');


module.exports = {
    register : async (req,res)=>{

        try{
            // check if account already exist 
            let user = await User.findOne({email: req.body.email});
            if (user) {
                // return res.status(400).json({
                //     message : 'User already exist'
                // })
                return next(boom.badRequest("User already exist"));

            }
            // password crypt 
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password,salt);

            // insert user into DB
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                role: "member"
            })
            user = await user.save();
            // return user_id
            res.json({
                id: user._id
            })
        } catch (err){
            // return res.status(500).json({
            //     message:err.message
            // })
            return next(boom.internal(err.message));
        }
    },
    login : async (req,res) => {
        try {
            let user = await User.findOne({email:req.body.email});
            if (!user){
                // return res.status(401).json({
                //     message: "Invalid email or password"
                // })
                return next(boom.unauthorized("Invalid email or password"));
                
            }
           const validPassword = await bcrypt.compare(req.body.password, user.password);
           if(!validPassword){
            //  return res.status(401).json({
            //      message: "Invalid email or password"
            //  })
            return next(boom.unauthorized("Invalid email or password"));
           }
           // generate token
           const token = jwt.sign({
               id: user._id,
               role: user.role
           }, config.get('jwtPrivateJey'));

           res.json({
               token: token
           })

        }catch (err){
            // return res.status(500).json({
            //     message:err.message
            // })
            return next(boom.internal(err.message));
        }
      
    },
    me : async (req,res) => {
        try{
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);

        }catch(err){
            // res.status(500).json({
            //     message : err.message
            // })
            return next(boom.internal(err.message));
        }
    }
}