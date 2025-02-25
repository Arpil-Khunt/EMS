import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import { addLeave,getLeaves } from "../controller/leave.js";

router.get("/",verifyUser,getLeaves);
router.post("/add", verifyUser, addLeave);

export default router;
