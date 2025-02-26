import Employee from "../models/employee.js";
import Salary from "../models/salary.js";

export const getSalary = async (req, res) => {
  try {
    let findSalary;
    const { _id } = req.params;
    findSalary = await Salary.find({ employeeId: _id }).populate(
      "employeeId",
      "employeeId"
    );
    if (!findSalary || findSalary.length === 0) {
      const employee = await Employee.findOne({ userId: _id });
      if (employee) {
        findSalary = await Salary.find({ employeeId: employee._id }).populate(
          "employeeId",
          "employeeId"
        );
      }
    }

    return res.status(200).json({ success: true, findSalary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get salary server side error" });
  }
};

export const handleAddSalary = async (req, res) => {
  try {
    const {
      department,
      employeeId,
      basicSalary,
      allowances,
      deduction,
      payDate,
    } = req.body;

    const netSalary =
      Number(basicSalary) + Number(allowances) - Number(deduction);

    const newSalary = await new Salary({
      departmentId: department,
      employeeId,
      basicSalary,
      allowances,
      deduction,
      payDate,
      netSalary,
    });
    const savedSalary = await newSalary.save();
    if (savedSalary) {
      return res
        .status(200)
        .json({ success: true, message: "salary added successfully" });
    } else {
      return res.status(500).json({
        success: false,
        error: "salary not saved to database",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server side error, salary data not added to database",
    });
  }
};
