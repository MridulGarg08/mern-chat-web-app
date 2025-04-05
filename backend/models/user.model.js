import mongoose from "mongoose";

const schema={
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    }
}
const userSchema=mongoose.Schema(schema,{timestamps:true})
const User=mongoose.model("User",userSchema);
export default User;