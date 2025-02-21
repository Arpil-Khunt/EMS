import { extname } from "path";
import Department from "../models/department.js";
import Employee from "../models/employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const handleAddEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email }).select("-password");
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "user already registered as employee" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const saveUser = await newUser.save();

    // const findDepartment = await Department.findOne({ dep_name: department });

    const newEmployee = await new Employee({
      userId: saveUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res
      .status(200)
      .json({ success: true, message: "Employee created." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error in adding employee" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Employee server error" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { _id } = req.params;
    const employee = await Employee.findById(_id)
      .populate("userId", { passweord: 0 })
      .populate("department");

    if (!employee) {
      return res
        .status(400)
        .json({ success: false, error: "employee not found!" });
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "get employee server error, try after some time",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, maritalStatus, department, designation, salary, role } =
      req.body;
    const employee = await Employee.findById(_id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found!" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found!" });
    } else {
      const editEmployee = await Employee.findByIdAndUpdate(
        { _id },
        {
          $set: {
            maritalStatus: maritalStatus,
            designation: designation,
            salary: salary,
            department: department,
          },
        }
      );
      if (!editEmployee) {
        return res
          .status(404)
          .json({ success: false, error: "employee not updated!" });
      }
      if (req.file) {
        const editUser = await User.findByIdAndUpdate(
          { _id: employee.userId },
          { $set: { name: name, role: role, profileImage: req.file.filename } }
        ).select("-password");
        if (!editUser) {
          return res
            .status(404)
            .json({ success: false, error: "employee not updated!" });
        }
      } else {
        const editUser = await User.findByIdAndUpdate(
          { _id: employee.userId },
          { $set: { name: name, role: role } }
        ).select("-password");
        if (!editUser) {
          return res
            .status(404)
            .json({ success: false, error: "employee not updated!" });
        }
      }

      return res
        .status(200)
        .json({
          success: true,
          employee,
          message: "employee updated successfully!",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "update employee server error, try after some time",
    });
  }
};
