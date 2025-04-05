import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async (req,res)=>{

    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
            participants:{$all:[senderId, receiverId]},
        })
        // if(!conversation)
        // {
        //     conversation=await Conversation.create({
        //         participants:[senderId,receiverId],
        //     })
        // }
        // const newMessage= await Message.create({
        //     senderId:senderId,
        //     receiverId:receiverId,
        //     message:message
        // })
        if(!conversation)
            {
                conversation= Conversation.create({
                    participants:[senderId,receiverId],
                })
            }
            const newMessage= new Message({
                senderId:senderId,
                receiverId:receiverId,
                message:message
            })

        if(newMessage)
        {
            conversation.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await conversation.save();
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in Send Message Controller",error.message);
        res.status(500).json({error:error.message})
    }
}
export const getMessages=async (req,res)=>
{
    try {
        const{id:UserToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId, UserToChatId]},
        })
        .populate("messages");
        if(!conversation)
            return res.status(200).json([]);
        const messages=conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
            console.log("Error in Send Message Controller",error.message);
            res.status(500).json({error:error.message})
    }
}