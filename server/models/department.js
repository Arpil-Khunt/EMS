import mongoose from "mongoose";
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

const Department = mongoose.model("Department", departmentSchema);

export default Department;
