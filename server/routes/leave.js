import express from "express";
const router = express.Router();
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeaves,
  getAllLeaves,
  getLeaveDetails,
  editLeaveStatus,
  getLeaveHistory,
} from "../controller/leave.js";

router.get("/", verifyUser, getLeaves);
router.get("/admin-leave", verifyUser, getAllLeaves);
router.get("/:empId", verifyUser, getLeaveHistory);
router.get("/leave-details/:_id", verifyUser, getLeaveDetails);
router.post("/add", verifyUser, addLeave);
router.put("/update-status/:_id", verifyUser, editLeaveStatus);

export default router;
