const express=require('express')
const router=express.Router()
const passport=require('passport')


const {isAdminLoggedIn,isOperatorLoggedIn,isAdmin,isOperator}=require('../middleware')
const operator=require('../controllers/operator')

router.get('/',operator.index)

 router.get('/signup',operator.renderSignupForm)
 router.post('/signup',isOperator,operator.operatorSignup)
 router.get('/login',operator.renderLoginForm)
 
 router.post('/login',isOperator,passport.authenticate('local',{failureFlash:true,failureRedirect:'/operator/login', keepSessionInfo: true}),operator.operatorLogin)

 module.exports=router
