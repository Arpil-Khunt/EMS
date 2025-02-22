import express from "express";
import { handleAddSalary,getSalary } from "../controller/salary.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add", verifyUser, handleAddSalary);
router.get("/:_id",verifyUser,getSalary);

export default router;
