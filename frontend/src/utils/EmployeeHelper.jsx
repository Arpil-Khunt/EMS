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

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-4 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-yellow-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Salary
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(_id)}
      >
        Leave
      </button>
    </div>
  );
};
