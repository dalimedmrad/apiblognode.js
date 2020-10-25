const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    name: {
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:String
});
 
    //Model
    
    const User = mongoose.model('User', userSchema);
   
    module.exports = User;