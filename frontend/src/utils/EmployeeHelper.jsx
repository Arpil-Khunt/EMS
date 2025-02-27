import axios from "axios";
import { useNavigate } from "react-router-dom";
export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "100px" },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "120px",
  },
  { name: "Name", selector: (row) => row.name, width: "200px", sortable: true },
  { name: "Department", selector: (row) => row.dep_name, width: "170px" },
  { name: "DOB", selector: (row) => row.dob, width: "170px", sortable: true },

  { name: "Action", selector: (row) => row.action, center: "true" },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:8080/api/department/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const fetchEmployeeByDepartment = async (_id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/employee/department/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      employees = response.data.employee;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button
        className="px-4 py-1 bg-red-500 text-white hover:bg-red-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/leave/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};
