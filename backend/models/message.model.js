import mongoose from "mongoose"

const schema={
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
}
const messageSchema=mongoose.Schema(schema,{timestamps:true});
const Message=mongoose.model("Message",messageSchema)
export default Message;
