const Employee=require('../models/employee')
const Item=require('../models/belonging')
const ExpressError = require('../utils/ExpressError')
const Joi=require('joi')
const {validateEmployee}=require('../middleware')



module.exports.index=async(req,res)=>{
    const employees=await Employee.find()
 
    res.render('employee/employees',{employees})
}

module.exports.renderNewForm=(req,res)=>{
    res.render('employee/new')
 }
 
module.exports.createEmployee=async(req,res)=>{
   // if(!req.body)throw new ExpressError('invalid data',400)
   
    const employee=new Employee(req.body)
    await employee.save()
    req.flash('success','successfully registered an employee')
    res.redirect('/employees')
 }

 module.exports.showEmployee=async(req,res)=>{
    const {emp_id}=req.params
    const employee=await Employee.findById(emp_id).populate('belongings')
    // console.log(employee)
    if(!employee){
      req.flash('error','can not find that employee')
      return res.redirect('/employees')

    }
    res.render('employee/show',{employee})
 }

module.exports.renderEditForm=async(req,res)=>{
    const {emp_id}=req.params
    const employee=await Employee.findById(emp_id)
    if(!employee){
       req.flash('error','can not find that employee')
       return res.redirect('/employees')
    }
    res.render('employee/edit',{employee})
 }

 module.exports.updateEmployee=async(req,res)=>{
    const {emp_id}=req.params
    const employee=await Employee.findByIdAndUpdate(emp_id,{...req.body})
    req.flash('success',"Successfully updated employee's info")
    res.redirect(`/employees/${emp_id}`)
 
 }

 module.exports.deleteEmployee=async(req,res)=>{
   const {emp_id}=req.params
   await Employee.findByIdAndDelete(emp_id)
   req.flash('success','successfully removed an employee')
   res.redirect('/employees')
}

 module.exports.renderNewItemForm=async(req,res)=>{
 
    const {emp_id}=req.params
    const employee=await Employee.findById(emp_id)
    res.render('item/new',{emp_id,employee})
 
 }
 module.exports.createItem=async(req,res)=>{
    const {emp_id}=req.params
    const {name,model,serialNo}=req.body
    const employee=await Employee.findById(emp_id)
    const item=new Item({name,model,serialNo})
    employee.belongings.push(item)
    item.owner=employee
    await item.save()
    await employee.save()
    req.flash('success','successfully added an item')
    res.redirect(`/employees/${employee._id}`)
    // res.send(employee)
 
    // res.send(req.body)
 
 }