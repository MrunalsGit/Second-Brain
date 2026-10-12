import express from "express";
import mongoose from "mongoose"
import "dotenv/config";
const mongooseUrl = process.env.mongooseUrl
import { UserModel } from "./db.js";
const jwtUserKey = process.env.jwtUserKey
import jwt from "jsonwebtoken"
import z from "zod"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json())

const userZod = z.object({
    userName : z.string().min(1,{"message" : "Username cannot be empty"}),
    password : z.string().min(1,{"message" : "Password cannot be empty"})
})

app.post("/api/v1/signup", async (req,res)=>{
    try{
        const {success,error} = userZod.safeParse(req.body)
        
        if(!success){
            console.log(`Zod error`)
            res.status(411).json({
                "message" :  `Enter proper credentials : ${error.issues[0]?.message}`
            })
        }
    
        const userName = req.body.userName
        const password = req.body.password

        const hashedPassword = await bcrypt.hash(password,5)

        try{    
            await UserModel.create({
                userName,
                password : hashedPassword
            })

            res.json({
                message : 'Signed in'
            })
        }
        catch(err){
            res.status(411).json({
                "message" : "User already exists"
            })
        }
    }
    catch(err){
        console.log(`Error while signing up : ${err}`)
        res.status(401).json({
            "message" : `Error occured ${err}` 
        })
    }
})

app.post("/api/v1/signin", async (req,res)=>{
    
})

app.post("/api/v1/content", (req,res)=>{
    const {link, tags, type, title, userId} = req.body
})

app.get("/api/v1/content", (req,res)=>{

})

app.delete("api/v1/content", (req,res)=>{

})

app.post("/api/v1/brain/share", (req,res)=>{

})

app.get("/api/v1/brain/:shareLink", (req,res)=>{

})

async function connectToDB(){
    try{
        await mongoose.connect(mongooseUrl!)
        app.listen(3000)
        console.log("Live")
    }
    catch(err){
        console.log("DB connection error : ", err)
    }
}
connectToDB();