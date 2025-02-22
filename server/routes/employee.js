import express from "express";
import {
  handleAddEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  getEmployeeByDepartment,
} from "../controller/employee.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyUser, getEmployees);
router.post("/add", verifyUser, upload.single("image"), handleAddEmployee);
router.get("/department/:_id", verifyUser, getEmployeeByDepartment);
router
  .route("/:_id")
  .get(verifyUser, getEmployee)
  .put(verifyUser, upload.single("image"), updateEmployee);

export default router;
