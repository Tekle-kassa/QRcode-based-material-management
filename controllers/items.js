const Item=require('../models/belonging')

module.exports.index=async(req,res)=>{
    const items= await Item.find()
    res.render('item/items',{items})
}

module.exports.showItem=async(req,res)=>{
    const {item_id}=req.params
    const item=await Item.findById(item_id).populate('owner','firstname')
    res.render('item/show',{item})
 }