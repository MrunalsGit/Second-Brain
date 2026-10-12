import Router from "express"
export const ContentRouter = Router()
import { UserMiddleware } from "../Middlewares/userMiddleware.js"
import { ContentModel } from "../db.js"

ContentRouter.post("/", UserMiddleware, async(req,res)=>{
    try{
        const {link,type,title,tags} = req.body
        //@ts-ignore
        const userId = req.userId

        await ContentModel.create({
            link,title,type,userId,tags
        })

        res.json({message :`Content added`})
    }
    catch(err){
        res.status(500).json({message: err})
    }

})

ContentRouter.get("/", UserMiddleware, async(req,res)=>{
    try{
        //@ts-ignore
        const userId = req.userId

        const contents = await ContentModel.find({userId}).populate("userId", "userName")

        res.json({contents})
    }
    catch(err){
        console.log(`Error while fetching user contents`)
        res.status(500).json({message : err})
    }
})

ContentRouter.delete("/", UserMiddleware, async (req,res)=>{
    //@ts-ignore
    const userId = req.userId
    const {contentId} = req.body

    await ContentModel.deleteOne({
        _id : contentId,
        userId
    })

    res.json({message : `Deleted`})

})