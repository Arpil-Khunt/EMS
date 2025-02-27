import { useNavigate } from "react-router-dom";
import axios from "axios";
export const columns = [
  { name: "S No", selector: (row) => row.sno, sortable: true },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  { name: "Action", selector: (row) => row.action },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    let permission = confirm("Do you want to delete?");
    if (permission) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        } else {
          alert(response.data.error);
          navigate("/admin-dashboard/departments");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
          navigate("/admin-dashboard/departments");
        }
      }
    } else {
      navigate("/admin-dashboard/departments");
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
