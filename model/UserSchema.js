const mongoose=require("mongoose")
const UserSchema = {
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }       
}

const UserModel = mongoose.model('imcaUser',UserSchema)

module.exports=UserModel