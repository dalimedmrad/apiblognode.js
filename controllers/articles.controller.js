// Models
const  Article = require('../models/article'); 
const boom = require('boom');

module.exports = {
    findAll :async(req,res,next)=>{
        let page = (req.query.page)?req.query.page:1;
        let perpage = 10;
        try{
            const articles = await Article.find().limit(perpage).skip((page-1)*perpage);
            res.json(articles);
        }catch(err){
            // res.status(500).json({
            //     message: err.message
            // })
            return next(boom.internal());
        }
    },
    findByID : async(req,res,next)=>{
        const id = req.params.id;
    
        try{
            const article = await Article.findById(id);
            if(!article){
                // return res.status(404).json({
                //     status:404,
                //     message:"Article Not Found"
                // })
                return next(boom.notFound("Article Not Found"));
            }
            res.json(article);
        }catch(err){
            // return res.status(404).json({
            //     status:404,
            //     message:"Article Not Found"
            // })
            return next(boom.notFound("Article Not Found"));
        }
    },
    create : async (req,res,next)=>{
        // insert article in DB
        try {
    
            let author = (req.body.author) ? req.body.author : "Dali";  
    
            const article = new Article({
                title: req.body.title,
                content:req.body.content,
                author:author,
                tags: req.body.tags,
                category: req.body.category,
                isPublished:true
            })
            let a = await article.save();
            
            res.json(a);
            
        } catch (err){
            // res.status(500).json({
            //     message:err.message
            // });
            return next(boom.internal(err.message));

        }
    }, 
    update : async(req,res,next) => {
        try{
            const id = req.params.id;
        //Query first
            // const article = await Article.findById(id);
        
            // if(!article){
            //     return res.status(404).json({
            //         status:404,
            //         message:"article not found"
            //     })
            // }
        
            // article.title = req.body.title;
            // article.content = req.body.content;
        
            // const result = await article.save();
            // res.json(article);
    
        //update first
    
       const article = await Article.findByIdAndUpdate(id,{
            $set:{
                title:req.body.title,
                content:req.body.content
            }
        }, {new:true});
        res.json(article);
        }catch(err){
            // return res.status(404).json({
            //     status:404,
            //     message:"article not found"
            // })
            return next(boom.notFound("Article Not Found"));
        } 
    },
    delete : async(req,res,next)=> {
        const id = req.params.id;
        try{
            const result = await Article.findByIdAndRemove(id);
            if (result){
                return res.json({
                    message:"article delated with succesfful"
                });
    
            } else{
                // return res.status(404).json({
                //     status:404,
                //     message:"article not found"
                // });
                return next(boom.notFound("Article Not Found"));
            }
            
        } catch(err){
            // return res.status(404).json({
            //     status:404,
            //     message:"article not found"
            // });
            return next(boom.notFound("Article Not Found"));

        }
    
    }

}