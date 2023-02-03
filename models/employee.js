const mongoose=require('mongoose')
const Schema=mongoose.Schema

const EmployeeSchema=new Schema({
    firstname:{
        type:String,
        required:[true,'firstname cant be empty']
    },
    lastname:{
        type:String,
        required:[true,'lastname cant be empty']
    },
    email:{
        type:String,
        required:[true,'email cant be empty']
    },
    phone:{
        type:String,
        // required:[true,'phone  number cant be empty']
    },
    // image:{
    //     img:{
    //         data:Buffer,
    //         contentType:String
    //     }
    // },
    belongings:[
        {
            type:Schema.Types.ObjectId,
            ref:'Item'
        }
    ]
})

const Employee=mongoose.model('Employee',EmployeeSchema)
module.exports=Employee
