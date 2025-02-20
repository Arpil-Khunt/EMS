import Department from "../models/department.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments: departments });
  } catch (error) {
    console.log("error occur");
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

export const handleAddDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = await new Department({ dep_name, description });
    await newDepartment.save();
    return res.status(201).json({
      success: true,
      department: newDepartment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const { _id } = req.params;
    const department = await Department.findById(_id);
    if (!department) {
      return res
        .status(400)
        .json({ success: false, error: "department not found!" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "get department server error, try after some time",
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { dep_name, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      // More accurate variable name
      _id, // Simplified _id passing
      { dep_name, description },
      { new: true } // new: true
    );

    if (!updatedDepartment) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, updateDepartment });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "update department server side error, please try after some time",
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteDep = await Department.findByIdAndDelete(_id);
    if (!deleteDep) {
      return res
        .status(400)
        .json({ success: false, error: "sorry, not such department found!" });
    }
    res
      .status(200)
      .json({
        success: true,
        deleteDep,
        message: "department deleted successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server side error occur, please try after some time!",
    });
  }
};
