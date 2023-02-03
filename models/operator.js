const mongoose=require('mongoose')
const Schema=mongoose.Schema

const OperatorSchema=new Schema({
 username:{
    type:String,
    required:true,
    unique:true
 }
})
 const Operator=mongoose.model('Operator',OperatorSchema)
 module.exports=Operator