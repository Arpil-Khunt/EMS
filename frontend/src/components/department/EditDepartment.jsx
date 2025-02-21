import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditDepartment = () => {
  const { _id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/department/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          console.log("server error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, [_id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/department/${_id}`,
        {
          // Send dep_name and description directly
          dep_name: department.dep_name,
          description: department.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("server side error please try again later");
        navigate("/admin-dashboard");
      }
    } finally {
      setLoading(false);
    }
  };
  if (!department) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                id="dep_name"
                type="text"
                name="dep_name"
                placeholder="Enter Dep Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                value={department.dep_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="4"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={department.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
