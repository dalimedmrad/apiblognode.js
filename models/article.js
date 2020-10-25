const mongoose = require('mongoose');

// schema
const articleSchema = new mongoose.Schema({
    title: {
       type:String,
       required:true,
      // minlength:5,
      // maxlength:13   
    },
    content: {
       type:String,
       required:true
    },
    author:String,
    category:{
       type:String,
       // enum:['web','mobile']
    },
    tags:{
       type:Array,
      //  validate:{
      //     validator: function(v){
      //        return v && v.length > 0;
      //     },
      //     message : "tags must be not empty",
         
      //  }
       
    },
    date:{
       type:Date,
       default:Date.now
    },
    isPublished:Boolean
 });
 
 //Model
 
 const Article = mongoose.model('Article', articleSchema);

 module.exports = Article;