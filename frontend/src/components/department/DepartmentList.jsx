import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/departmentHelper";

const DepartmentList = () => {
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]); // Departments after filtering

  const onDepartmentDelete = (id) => {
    setDepartment((prevDepartments) => {
      const updatedDepartments = prevDepartments.filter(
        (dep) => dep._id !== id
      );
      // Recalculate serial numbers
      return updatedDepartments.map((dep, index) => ({
        ...dep, // Keep other properties
        sno: index + 1, // Correct serial number
      }));
    });

    setFilteredDepartments((prevFilteredDepartments) => {
      const updatedFilteredDepartments = prevFilteredDepartments.filter(
        (dep) => dep._id !== id
      );
      return updatedFilteredDepartments.map((dep, index) => ({
        ...dep,
        sno: index + 1,
      }));
    });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/department/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                _id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));
          setDepartment(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const filterDepartments = () => {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = department.filter((dep) =>
        dep.dep_name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredDepartments(filtered);
    };

    filterDepartments(); // Call the filter function
  }, [query, department]); // Add departments to the dependency array

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // let filterDepartment =

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="search by department name"
              className="px-4 py-0.5 border"
              value={query}
              onChange={handleChange}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
