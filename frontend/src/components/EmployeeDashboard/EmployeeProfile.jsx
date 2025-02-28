import React, { useState, useEffect } from "react";

import axios from "axios";
import { useAuth } from "../../context/authContext";

const EmployeeProfile = () => {
  const { user } = useAuth();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employee/profile/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("check server connection");
        }
      }
    };
    fetchEmployees();
  }, []);

  if (!employee) {
    return <div>Loading..</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={`http://localhost:8080/${employee.userId.profileImage}`}
            alt="profile image"
            className="rounded-full border w-72 h-72"
          />
        </div>

        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name: </p>
            <p className="font-medium">{employee.userId.name.toUpperCase()}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Email: </p>
            <p className="font-medium">{employee.userId.email}</p>
          </div>

          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee ID: </p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Date Of Birth: </p>
            <p className="font-medium">
              {new Date(employee.dob).toLocaleDateString("en-CA")}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Salary: </p>
            <p className="font-medium">{employee.salary}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Gender: </p>
            <p className="font-medium">{employee.gender.toUpperCase()}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department: </p>
            <p className="font-medium">
              {employee.department.dep_name.toUpperCase()}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Marital Status: </p>
            <p className="font-medium">
              {employee.maritalStatus.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
