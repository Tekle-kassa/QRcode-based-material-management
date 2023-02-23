const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const ejsMate=require('ejs-mate')
const Joi=require('joi')
const path=require('path')
const methodOverride=require('method-override')
// const bcrypt=require('bcrypt')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const fs=require('fs')
const bodyParser=require('body-parser')








const catchAsync=require('./utils/catchAsync')
const ExpressError=require('./utils/ExpressError')


const Authority=require('./models/authorities')
const Admin=require('./models/admin')
const Operator=require('./models/operator')





const {isAdminLoggedIn,isOperatorLoggedIn,isAdmin,isOperator}=require('./middleware')



const app=express()
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/MMS')
 .then(()=>{
    console.log("connected")
 }).catch((e)=>{
    console.log(e)
 })

const sessionConfig={
   secret:'thisshouldbeasecret',
   resave:false,
   saveUninitialized:true,
   cookie:{
      httpOnly:true,
      expires:Date.now()+1000*60*60*24*7,
      maxAge:1000*60*60*24*7
   }
   
}
 app.engine('ejs',ejsMate)
 app.set('view engine','ejs')
 app.set('views','views')

 app.use(express.urlencoded({extended:true}))
 app.use(bodyParser.json())
 app.use(methodOverride('_method'))
 app.use(express.static(path.join(__dirname,'public')))
 app.use(session(sessionConfig))
 app.use(flash())
 app.use(passport.initialize())
 app.use(passport.session())

 passport.use(new LocalStrategy(Authority.authenticate()))

 passport.serializeUser(Authority.serializeUser())
 passport.deserializeUser(Authority.deserializeUser())
 
 app.use((req,res,next)=>{
   res.locals.currentUser=req.user
   res.locals.success=req.flash('success')
   res.locals.error=req.flash('error')
   next()
 })

 const employees=require('./routes/employees')
 const admin=require('./routes/admin')
 const operator=require('./routes/operator')
 const items=require('./routes/items')


 
 app.use('/employees',isAdminLoggedIn,employees)
 app.use('/admin',admin)
 app.use('/operator',operator)
 app.use('/items',items)

 app.get('/',(req,res)=>{
    res.render("home")
    // res.send('home')
 })

const register=async(req,res,next)=>{
   if(req.user.role!=="admin"){
      req.session.passport=null
      req.flash("error","you are not an admin")
      res.redirect('/admin/login')
   }else{
      next()
   }
      
   
}


 /////////////////THE register ROUTES////////////////////////////////////////////
app.get('/register',isAdminLoggedIn,register,(req,res)=>{//to register an admin the other admin should be logged in&this previlage is only given for the admin!
   res.render('admin/register')
})

app.post('/register',isAdminLoggedIn,catchAsync(async(req,res)=>{
   try{
   const {username,role}=req.body
   // res.send(req.body)
   if(role==="admin"){
      const admin=new Admin({username})
      await admin.save()
      
   }else if(role==="operator"){
      const operator=new Operator({username})
      await operator.save()
   }
   req.flash('success',`successfully added an ${role}`)
   res.redirect('/')
} catch(e){
   req.flash('error','the name is already in use')
   res.redirect('/register')
}

   

}))

app.get('/login',(req,res,next)=>{
   res.render('login')
})
app.get('/signup',(req,res,next)=>{
   res.render('signup')
})


app.get('/logout',(req,res,next)=>{
   req.session.passport=null
   req.flash('success','Goodbye')
   res.redirect('/')
})

app.get('/readCode',(req,res,next)=>{
    res.render('read')     
})

app.all('*',(req,res,next)=>{
   // res.send('404')
   next(new ExpressError('Page Not Found',404))
})

app.use((err,req,res,next)=>{
   const {statusCode=500,message='Something Went Wrong'}=err
   res.status(statusCode).send(message)
   // res.send('smtn went wrong')
})


 app.listen(3000,()=>{
    console.log("listening on port 3000")
 })
 