import express from "express";
const router = express.Router();

import { verifyUser } from "../middleware/authMiddleware.js";
import { getSummary } from "../controller/summary.js";

router.get("/summary", verifyUser, getSummary);

export default router;
