const Authority=require('../models/authorities')

module.exports.index=(req,res)=>{
    res.render('operator/operator')
}

module.exports.renderSignupForm=(req,res)=>{
    res.render('operator/signup')
}

module.exports.operatorSignup=async(req,res)=>{
    try{

    
    const {username,role,email,firstname,lastname,password}=req.body
    const operator=new Authority({firstname,lastname,username,role:"operator",email})
    const registeredAdmin=await Authority.register(operator,password)
    // console.log(registeredAdmin)
    req.login(registeredAdmin,err=>{
        if(err) return next(err)
        req.flash('success',`welcome ${username}`)
        res.redirect('/')
    })
}catch(e){
    req.flash('error',e.message)
    res.redirect('/operator/signup')
}
    // req.flash('success',`welcome ${username}`)
    // res.redirect('/') 
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('operator/login')
 
}

module.exports.operatorLogin=(req,res)=>{
    const redirectUrl=req.session.returnTo || '/'
    delete req.session.returnTo
    req.flash('success','welcome back')
    res.redirect(redirectUrl)
   
    
   
 }
