const express=require('express')
const router=express.Router()
const passport=require('passport')


const {isAdminLoggedIn,isOperatorLoggedIn,isAdmin,isOperator}=require('../middleware')

const admin=require('../controllers/admin')
const catchAsync = require('../utils/catchAsync')



router.get('/',admin.index)

router.get('/signup',admin.renderSignupForm)
 
 router.post('/signup',isAdmin,catchAsync(admin.adminSignup))
 
 router.get('/login',admin.renderLoginForm)
 
 router.post('/login',isAdmin,passport.authenticate('local',{failureFlash:true,failureRedirect:'/admin/login',keepSessionInfo:true}),admin.adminLogin)
//  router.get('/logout',admin.adminLogout)

 module.exports=router