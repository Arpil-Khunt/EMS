import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteDepartment = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const deleteDep = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/department/delete/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("department deleted successfully");
          navigate("/admin-dashboard/departments");
        } else {
          alert(response.data.error);
          navigate("/admin-dashboard/departments");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
          navigate("/admin-dashboard/departments");
        }
      } finally {
        setLoading(false);
      }
    };
    deleteDep();
  }, [_id]);

  return <>{loading ? <div>deleting...</div> : <div>DeleteDepartment</div>}</>;
};

export default DeleteDepartment;
