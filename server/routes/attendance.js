import express from "express";
const router = express.Router();

import {
  getAttendance,
  handleMarkAttendance,
  attendaceReport,
} from "../controller/attendance.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import defaultAttendance from "../middleware/defaultAttendance.js";

router.get("/", verifyUser, defaultAttendance, getAttendance);
router.get("/attendance-report", attendaceReport);
router.put("/mark-attendance", verifyUser, handleMarkAttendance);

export default router;
