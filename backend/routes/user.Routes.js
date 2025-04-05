import express from "express";
import protectRoute from "../middlewares/protectroute.js";
import { getUsersforSideBar } from "../controllers/userController.js";

const router=express.Router();

router.get("/",protectRoute, getUsersforSideBar);


export default router;