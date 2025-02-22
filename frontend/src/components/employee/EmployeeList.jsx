import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Departments after filtering

  // const onDepartmentDelete = (id) => {
  //   setEmployees((prevEmployees) => {
  //     const updatedEmployees = prevEmployees.filter((emp) => emp._id !== id);
  //     // Recalculate serial numbers
  //     return updatedEmployees.map((emp, index) => ({
  //       ...emp, // Keep other properties
  //       sno: index + 1, // Correct serial number
  //     }));
  //   });

  //   setFilteredDepartments((prevFilteredEmployees) => {
  //     const updatedFilteredEmployees = prevFilteredEmployees.filter(
  //       (emp) => emp._id !== id
  //     );
  //     return updatedFilteredEmployees.map((emp, index) => ({
  //       ...emp,
  //       sno: index + 1,
  //     }));
  //   });
  // };

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/employee/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,

            name: emp.userId.name.toUpperCase(),
            dep_name: emp.department.dep_name,
            dob: new Date(emp.dob).toLocaleDateString("en-CA"),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:8080/${emp.userId.profileImage}`}
                alt="profile image"
              />
            ),
            action: (
              <EmployeeButtons
                _id={emp._id}
                // onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filterEmployees = () => {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = employees.filter((emp) => {
        const nameFiltered = emp.name.toLowerCase().includes(lowerCaseQuery);
        const departmentFiltered = emp.dep_name
          .toLowerCase()
          .includes(lowerCaseQuery);
        return nameFiltered || departmentFiltered;
      });
      setFilteredEmployees(filtered);
    };

    filterEmployees(); // Call the filter function
  }, [query, employees]); // Add departments to the dependency array

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // let filterDepartment =

  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="search By Employee Name or Department"
              className="px-4 py-0.5 border"
              value={query}
              onChange={handleChange}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredEmployees} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
