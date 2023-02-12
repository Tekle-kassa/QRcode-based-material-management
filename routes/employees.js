const express=require('express')
const router=express.Router()
const {validateEmployee}=require('../middleware')

const Employee=require('../models/employee')
const employees=require('../controllers/employees')
const catchAsync = require('../utils/catchAsync')
const {isAdminLoggedIn,isOperatorLoggedIn,isAdmin,isOperator}=require('../middleware')


router.get('/',catchAsync(employees.index))
router.get('/new',employees.renderNewForm)
router.post('/',validateEmployee,catchAsync(employees.createEmployee))
router.get('/qr',catchAsync(employees.QrCode))
router.get('/:emp_id',catchAsync(employees.showEmployee))
router.get('/:emp_id/edit',catchAsync(employees.renderEditForm))

 
router.put('/:emp_id',catchAsync(employees.updateEmployee))
router.delete('/:emp_id',catchAsync(employees.deleteEmployee))
router.get('/:emp_id/items/new',catchAsync(employees.renderNewItemForm))
router.post('/:emp_id/items',catchAsync(employees.createItem))



module.exports=router