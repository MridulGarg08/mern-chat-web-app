import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generatetokenandSetCookie from "../utils/generateToken.js";

export const login= async (req,res)=>{

    try {
        const {username,pass}=req.body;
        console.log(req.body);
        const user=await User.findOne({userName:username})
        const ispasswordCorrect= await bcryptjs.compare(pass,user?.password || "")
        if(!user || ! ispasswordCorrect)
            return res.status(400).json({error:"User Doesnt exists"})

        generatetokenandSetCookie(user._id,res);

        res.status(201).json({
            _id:user.id,
            fullname:user.fullName,
            username:user.userName,
            profilePic:user.profilePic
        })
        
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

}

export const signup=async (req,res)=>{
    try {
        const {fullname,username,pass,confirmPass,gender} = req.body;

        console.log(req.body);
        if(pass!==confirmPass)
            return res.status(400).json({error:"passwords didnt match"})
        
        const user=await User.findOne({userName:username})
        if(user)
            return res.status(400).json({error:"User already exists"})

        const salt=await bcryptjs.genSalt(10);
        const hashedpass= await bcryptjs.hash(pass,salt);
        //Hash Password

        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullName:fullname,
            userName:username,
            password:hashedpass,
            confirmPassword:confirmPass,
            gender:gender,
            profilePic:gender==='male'?boyProfilePic:girlProfilePic
        })

        if(newUser)
        {
            generatetokenandSetCookie(newUser.id,res);
            await newUser.save();
            res.status(201).json({
            _id:newUser.id,
            fullname:newUser.fullName,
            username:newUser.userName,
            profilePic:newUser.profilePic
        })
        }
        else
        {
            res.status(400).json({error:"Invalid Userdata"})
        }
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:error.message})
    }
    
}

export const logout= (req,res)=>{
    try {
        res.cookie("token","",{maxAge:0})
        res.status(200).json({message:"Logged Out Sucessfully"})
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}