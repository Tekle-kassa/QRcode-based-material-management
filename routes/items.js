const express=require('express')
const router=express.Router()


const items=require('../controllers/items')

router.get('/',items.index)
router.get('/:item_id',items.showItem)
router.delete('/:item_id',items.deleteItem)


module.exports=router