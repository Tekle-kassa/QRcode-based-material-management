const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ItemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    serialNo:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    }
})
const Item=mongoose.model('Item',ItemSchema)
module.exports=Item