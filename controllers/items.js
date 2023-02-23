const Item=require('../models/belonging')
const ExpressError = require('../utils/ExpressError')

module.exports.index=async(req,res)=>{
    const items= await Item.find()
    res.render('item/items',{items})
}

module.exports.showItem=async(req,res,next)=>{
    const {item_id}=req.params
    const item=await Item.findById(item_id).populate('owner','firstname')
    if(!item){
    //    return next(new ExpressError('Id Not Found',404))
    req.flash('error','could not find the URL')
    res.redirect('/readCode')
}else{
    res.render('item/show',{item})
}
    
 }

 module.exports.deleteItem=async(req,res)=>{
    const {item_id}=req.params
    await Item.findByIdAndDelete(item_id)
    req.flash('success','successfully removed an item')
    res.redirect('/employees')
 }