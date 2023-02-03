const mongoose=require('mongoose')
const Schema=mongoose.Schema
const passportLocalMongoose=require('passport-local-mongoose')
 const AuthoritySchema=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['admin','operator'],
        required:true

    }
 })
AuthoritySchema.plugin(passportLocalMongoose)
const Authority=mongoose.model('Authority',AuthoritySchema)
module.exports=Authority
