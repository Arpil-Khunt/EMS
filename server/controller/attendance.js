import Attendance from "../models/attendance.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate(
      {
        path: "employeeId",
        populate: [{ path: "department" }, { path: "userId", select: "name" }],
      } // Populate employee model
    );

    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get attendance error" });
  }
};

const handleMarkAttendance = async (req, res) => {
  try {
    const { employeeId, status } = req.body;

    const date = new Date().toISOString().split("T")[0];
    console.log(date);
    const existingAttendance = await Attendance.findOne({
      employeeId: employeeId._id,
      date,
    });

    if (existingAttendance) {
      const updatedAttendance = await Attendance.findOneAndUpdate(
        { employeeId: employeeId._id, date },
        { $set: { status: status } },
        { new: true }
      ); // Update attendance status
      console.log(updatedAttendance);
      return res.status(200).json({ success: true, updatedAttendance });
    }

    return res
      .status(404)
      .json({ success: false, error: "Attendance not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "mark attendance error" });
  }
};

const attendaceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;

    const query = date ? { date } : {};
    const attendance = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [{ path: "department" }, { path: "userId", select: "name" }], // Populate employee model
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendance.reduce((acc, curr) => {
      const { date } = curr;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        employeeId: curr.employeeId.employeeId,
        status: curr.status || "Not Marked",
        employeeName: curr.employeeId.userId.name,
        departmentName: curr.employeeId.department.dep_name,
      });
      return acc;
    }, {});

    return res.status(201).json({ success: true, groupData });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { getAttendance, handleMarkAttendance, attendaceReport };
