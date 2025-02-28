import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendaceSchema = new Schema({
  date: {
    type: String, //yyyy-mm-dd
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Sick", "Leave"],
    default: null,
  },
});

const Attendance = mongoose.model("Attendance", attendaceSchema);
export default Attendance;
