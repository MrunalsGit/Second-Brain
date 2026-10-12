import express from "express";
import mongoose from "mongoose"
import "dotenv/config";
const mongooseUrl = process.env.mongooseUrl
import { UserRouter } from "./Routes/auth.js";
import { ContentRouter } from "./Routes/content.js";
import { BrainRouter } from "./Routes/brain.js";


const app = express()
app.use(express.json())

app.use("/api/v1/auth", UserRouter)
app.use("/api/v1/content", ContentRouter)
app.use("/api/v1/brain", BrainRouter)

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