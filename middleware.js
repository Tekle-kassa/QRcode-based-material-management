const Authority=require('./models/authorities')
const Admin=require('./models/admin')
const Operator=require('./models/operator')
const Joi=require('joi')
const ExpressError=require('./utils/ExpressError')

module.exports.isAdminLoggedIn=async(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        req.flash('error','you must be signed in first')
        return res.redirect('/login')
    }
   next()
    
}
// module.exports.isLoggedIn=async(req,res,next)=>{
//    if(req.isAuthenticated && this.isAdmin)
// }
module.exports.isOperatorLoggedIn=async(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        return res.redirect('/operator/login')
    }
    next()
}

module.exports.isAdmin=async(req,res,next)=>{
    const {username}=req.body
    const admin=await Admin.findOne({username})
    if(!admin){
       req.flash('error','you are not an admin!')
       res.redirect('/admin/login')
    }else{
       next()
    }
  }
 
  module.exports.isOperator=async(req,res,next)=>{
    const {username}=req.body
    const operator=await Operator.findOne({username})
    if(!operator){
      req.flash('error','you are not an operator!')
      res.redirect('/operator/login')
    }else{
       next()
    }
  }

module.exports.validateEmployee=(req,res,next)=>{
   const employeeSchema=Joi.object({
      firstname:Joi.string().required(),
      lastname:Joi.string().required(),
      email:Joi.string().required(),
      phone:Joi.string().required(),
   })
   const {error}=employeeSchema.validate(req.body)
   if(error){
      const msg=error.details.map(el=>el.message).join(',')
      throw new ExpressError(msg,400)
   }else{
      next()

   }
   
}