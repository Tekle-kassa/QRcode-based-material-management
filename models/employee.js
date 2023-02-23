const mongoose=require('mongoose')
const Item=require('./belonging')
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

EmployeeSchema.post('findOneAndDelete',async function(employee){
    if(employee.belongings.length){
        const res=await Item.deleteMany({_id:{$in:employee.belongings}})
        // console.log(res)
    }
})

const Employee=mongoose.model('Employee',EmployeeSchema)
module.exports=Employee
