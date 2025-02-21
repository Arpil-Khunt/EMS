import express from "express";
import {
  handleAddEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/employee.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyUser, getEmployees);
router.post("/add", verifyUser, upload.single("image"), handleAddEmployee);

router
  .route("/:_id")
  .get(verifyUser, getEmployee)
  .put(verifyUser, upload.single("image"), updateEmployee);

export default router;
