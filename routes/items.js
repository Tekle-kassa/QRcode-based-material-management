const express=require('express')
const router=express.Router()


const items=require('../controllers/items')

router.get('/',items.index)
 router.get('/:item_id',items.showItem)

module.exports=router