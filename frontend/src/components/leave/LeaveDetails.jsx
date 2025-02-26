import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LeaveDetails = () => {
  const { _id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/leave/leave-details/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("check your connection or server side error");
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (_id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/leave/update-status/${_id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(`leave ${response.data.leave.status}`);
        navigate(`/admin-dashboard/leaves`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("check your connection or server side error");
      }
    }
  };

  if (!leave) {
    return <div>Loading..</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={`http://localhost:8080/${leave.employeeId.userId.profileImage}`}
            alt="profile image"
            className="rounded-full border w-72 h-72"
          />
        </div>

        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">
              {leave.employeeId.userId.name.toUpperCase()}
            </p>
          </div>

          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee ID: </p>
            <p className="font-medium">{leave.employeeId.employeeId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Leave Type: </p>
            <p className="font-medium">{leave.leaveType}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Reason: </p>
            <p className="font-medium">{leave.reason}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department: </p>
            <p className="font-medium">
              {leave.employeeId.department.dep_name.toUpperCase()}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Start Date: </p>
            <p className="font-medium">
              {new Date(leave.startDate).toLocaleDateString("en-CA")}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">End Date: </p>
            <p className="font-medium">
              {new Date(leave.endDate).toLocaleDateString("en-CA")}
            </p>
          </div>
          {leave.status !== "Pending" ? (
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Status: </p>
              <p className="font-medium">{leave.status}</p>
            </div>
          ) : (
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Action: </p>
              <button
                className="px-4 py-1 text-white bg-green-500 hover:bg-green-600 rounded-md"
                onClick={() => changeStatus(leave._id, "Approved")}
              >
                Approve
              </button>
              <button
                className="px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md"
                onClick={() => changeStatus(leave._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
