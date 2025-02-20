import express from "express";
import {
  handleAddDepartment,
  getDepartments,
  updateDepartment,
  getDepartment,
  deleteDepartment,
} from "../controller/department.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDepartments);
router.post("/add", verifyUser, handleAddDepartment);

router
  .route("/:_id")
  .get(verifyUser, getDepartment)
  .put(verifyUser, updateDepartment)
  .delete(verifyUser, deleteDepartment);

export default router;
