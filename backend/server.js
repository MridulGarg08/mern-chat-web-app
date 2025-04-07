import express from "express" ;
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authroutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.Routes.js"

import connectMongo from "./db/connectToMongoDB.js"
import { app, server } from "./socket/socket.js";
// import authroutes from "./routes/auth.routes.js"

dotenv.config();
const port=process.env.PORT||5000;
app.use(express.json())
app.use(cookieParser());

app.get("/",(req,res)=>{
    // root route "http://localhost:5000/"
    res.send("Hello World");
    console.log("Hello World");
})

app.use("/api/auth", authroutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

server.listen(port, () => {
    connectMongo();
    console.log(`Server running on port ${port}`); 
  })
