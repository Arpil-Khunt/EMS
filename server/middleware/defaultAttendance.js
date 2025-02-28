import Attendance from "../models/attendance.js";
import Employee from "../models/employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const existingAttendance = await Attendance.findOne({ date });

    if (!existingAttendance) {
      const employees = await Employee.find({});
      const attendance = employees.map((employee) => ({
        date,
        employeeId: employee._id,
        status: null,
      }));
      await Attendance.insertMany(attendance);
      console.log(existingAttendance);
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export default defaultAttendance;
