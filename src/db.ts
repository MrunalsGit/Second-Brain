import {model,Schema} from "mongoose"
import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
    userName : {type:String, unique:true, required:true},
    password : {type:String, required:true}
})

const contentSchema = new Schema({
    
})

const tag = new Schema ({
})

const link = new Schema ({
})

export const UserModel = model("User", userSchema)