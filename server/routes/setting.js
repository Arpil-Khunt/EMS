import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import { setPassword } from "../controller/setting.js";

router.put("/change-password", verifyUser, setPassword);

export default router;
