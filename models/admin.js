const mongoose=require('mongoose')
const Schema=mongoose.Schema

const AdminSchema=new Schema({
 username:{
    type:String,
    required:true,
    unique:true
 }
})
 const Admin=mongoose.model('Admin',AdminSchema)

//  const admin=new Admin({username:"tekle"})
//  admin.save()
 module.exports=Admin