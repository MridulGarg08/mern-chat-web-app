import mongoose from "mongoose";

const schema={
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
}
const conversationSchema=mongoose.Schema(schema,{timestamps:true});
const Conversation=mongoose.model("Conversation",conversationSchema);
export default Conversation;