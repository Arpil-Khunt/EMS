import mongoose from "mongoose";
import Employee from "./employee.js";
import Salary from "./salary.js";
import Leave from "./leave.js";
import User from "./user.js";
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  dep_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware for cascading deletes
departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const departmentId = this._id;

      // Delete related employees
      const employees = await Employee.find({ department: departmentId });
      for (const employee of employees) {
        // Delete salaries related to employees
        await Salary.deleteMany({ employeeId: employee._id });
        // Delete leaves related to employees
        await Leave.deleteMany({ employeeId: employee._id });
        //delete related user
        await User.deleteOne({ _id: employee.userId });
      }
      await Employee.deleteMany({ department: departmentId });

      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
