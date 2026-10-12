import {model,Schema} from "mongoose"
import mongoose from "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
    userName : {type:String, unique:true, required:true},
    password : {type:String, required:true}
})

const contentSchema = new Schema({
    link : String,
    type : String,
    title : String,
    tags : [{type: ObjectId, ref:'Tag'}],
    userId : {type:ObjectId, ref:'User', required:true}
})

const linkSchema = new Schema ({
    hash : String,
    userId : {type:ObjectId, ref : 'User', required: true, unique : true}
})

export const UserModel = model("User", userSchema)
export const ContentModel = model("Content", contentSchema)
export const LinkModel = model('Links', linkSchema)