import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchEmployeeByDepartment,
} from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deduction: 0,
    payDate: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getDepartment = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartment();
    setLoading(false);
  }, []);

  const handleDepartment = async (event) => {
    try {
      const { name, value } = event.target;
      const fetchedEmployees = await fetchEmployeeByDepartment(
        event.target.value
      );
      setEmployees(fetchedEmployees);
      setFormData((preFormData) => ({ ...preFormData, [name]: value }));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((preFormData) => ({ ...preFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/salary/add",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        alert("salary added successfully");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("server side issue, chek your network connection..");
      }
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add New Salary</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                name="department"
                id="department"
                value={formData.department}
                onChange={handleDepartment}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label
                htmlFor="employee"
                className="block text-sm font-medium text-gray-700"
              >
                Employee
              </label>
              <select
                name="employeeId"
                id="employee"
                value={formData.employeeId}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* Basic Salary */}
              <label
                htmlFor="basicSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Basic Salary
              </label>
              <input
                type="Number"
                id="basicSalary"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                min={0}
                placeholder="Insert Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* Allowances */}
            <div>
              <label
                htmlFor="allowances"
                className="block text-sm font-medium text-gray-700"
              >
                Allowances
              </label>
              <input
                type="Number"
                id="allowances"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                min={0}
                placeholder="Monthly Allowances"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* Deduction */}
            <div>
              <label
                htmlFor="deduction"
                className="block text-sm font-medium text-gray-700"
              >
                Deduction
              </label>
              <input
                type="Number"
                id="deduction"
                name="deduction"
                min={0}
                value={formData.deduction}
                onChange={handleChange}
                placeholder="Monthly Deduction"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label
                htmlFor="payDate"
                className="block text-sm font-medium text-gray-700"
              >
                Pay Date
              </label>
              <input
                type="Date"
                id="payDate"
                name="payDate"
                placeholder="Insert Name"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Salary
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
