import Router from 'express'
export const BrainRouter = Router()
import {ContentModel, LinkModel, UserModel} from "../db.js"
import { UserMiddleware } from '../Middlewares/userMiddleware.js'
import hashGen from '../utils/hashGenerator.js'

BrainRouter.post("/share", UserMiddleware, async (req,res)=>{
    //@ts-ignore
    const userId = req.userId
    const {share} = req.body

    if(!share){
        await LinkModel.deleteOne({userId})
        return res.json({
            message : `Sharing disabled`
        })
    }

    const exists = await LinkModel.findOne({userId})
    if(exists){
        return res.json({hash : exists.hash})
    }

    const hash:string = hashGen(5)

    await LinkModel.create({
        userId,
        hash
    })

    res.json({
        hash,
        message : `Sharing enabled`
    })
})

BrainRouter.get("/:shareLink", async(req,res)=>{
    const hash = req.params.shareLink

    const link = await LinkModel.findOne({hash})

    if(!link){
        return res.json({
            message:`User with this link doesn't exist`
        })
    }

    const userId = link.userId
    const contents = await ContentModel.find({userId})
    const user = await UserModel.findOne({_id : userId})

    res.json({
        userName : user!.userName,
        contents
    })
})