import Employee from "../models/employee.js";
import Leave from "../models/leave.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const findEmployee = await Employee.findOne({ userId: userId }).select(
      "-password"
    );

    if (!findEmployee) {
      return res
        .status(400)
        .json({ success: false, error: "employee not exist" });
    }
    const newLeave = await new Leave({
      employeeId: findEmployee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    const saveLeave = await newLeave.save();

    if (!saveLeave) {
      return res
        .status(400)
        .json({ status: false, error: "leave not created.." });
    }
    return res.status(200).json({ success: true, saveLeave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add leave server side error" });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const userId = req.user._id;
    const findEmployee = await Employee.findOne({ userId: userId }).select(
      "-password"
    );
    if (!findEmployee) {
      return res
        .status(400)
        .json({ success: false, error: "employee not exist" });
    }
    const leaves = await Leave.find({ employeeId: findEmployee._id });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get leaves server side error" });
  }
};
