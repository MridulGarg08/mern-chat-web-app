import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middlewares/protectroute.js";
// import { login,signup, logout } from "../controllers/userController.js";

const router=express.Router();

router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage);
// router.post("/signup",signup);
// router.post("/logout",logout);

export default router;
    