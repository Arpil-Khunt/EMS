import mongoose from "mongoose";
const Schema = mongoose.Schema;

const salarySchema = new Schema({
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  allowances: {
    type: Number,
  },
  deduction: {
    type: Number,
  },
  netSalary: {
    type: Number,
  },
  payDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
