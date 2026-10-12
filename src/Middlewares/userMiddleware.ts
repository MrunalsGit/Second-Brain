import ('dotenv/config')
import type { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
const jwtUserKey = process.env.jwtUserKey

export const UserMiddleware = (req : Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.headers.authorization
        const valid = jwt.verify(token!,jwtUserKey!)

        if(!valid){
            res.status(401).json({message : `Session expired login again`})
        }

        //@ts-ignore
        req.userId = valid.userId
        next()
    }
    catch(err){
        console.log(`Uer middleware error ${err}`)
        res.status(500).json({
            message : err
        })
    }
}