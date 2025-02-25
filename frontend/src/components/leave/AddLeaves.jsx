import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const AddLeaves = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState({ userId: user._id });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLeaveData((preLeaveData) => ({ ...preLeaveData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/leave/add",
        leaveData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      if (response.data.success) {
        alert("leave added successfully...");
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            {/* Leave Type */}
            <div>
              <label
                htmlFor="leaveType"
                className="block text-sm font-medium text-gray-700"
              >
                Leave Type
              </label>
              <select
                name="leaveType"
                id="leaveType"
                // value={formData.department}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Date */}
              <div>
                <label
                  htmlFor="fromDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  From Date
                </label>
                <input
                  type="Date"
                  id="fromDate"
                  name="startDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* To Date */}
              <div>
                <label
                  htmlFor="toDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  To Date
                </label>
                <input
                  type="Date"
                  id="toDate"
                  name="endDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="reason"
                id="description"
                placeholder="Reason"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaves;
