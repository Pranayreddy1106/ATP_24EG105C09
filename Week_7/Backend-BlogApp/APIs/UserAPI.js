// mak mini app
import exp from 'express'
import {ArticleModel} from '../models/ArticleModel.js'
import {UserModel} from '../models/UserModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const userApp = exp.Router()

// get all story
userApp.get('/articles',verifyToken("USER"),async(req,res)=>{
    // get id
    const userId = req.user?.id;
    // find human
    const user = await UserModel.findById(userId);
    if(!user.isUserActive){
        return res.status(400).json({message:"You are blocked from entering further pages"})
    }
    // read story
    const articlesList = await ArticleModel.find({isArticleActive:true});
    // yell back
    res.status(200).json({message:"All available Articles",payload:articlesList});
})

// add blah blah
userApp.put('/articles',verifyToken("USER"),async(req,res)=>{
    // get body
    console.log(req.body);
    const {articleId,comment}=req.body
    // find story
    
    const articleDoc = await ArticleModel.findOne({_id:articleId,isArticleActive:true})
                            .populate("comment.user");
    if(!articleDoc){
        return res.status(404).json({message:"Article not found"})
    }
    // find human
    const userId = req.user?.id;
    
    // add blah
    articleDoc.comment.push({user:userId,comment:comment});

    await articleDoc.save();
    // yell back
    res.status(200).json({message:"Comment added",payload:articleDoc})
})