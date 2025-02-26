import React, { useEffect } from "react";
import axios from "axios";
import { AdminLeaveColumns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { useState } from "react";
const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredLeave, setFilteredLeave] = useState([]);

  useEffect(() => {
    setLeaveLoading(true);
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/leave/admin-leave",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.leaves.map((leave) => ({
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name.toUpperCase(),
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days:
              new Date(leave.endDate).getDate() -
              new Date(leave.startDate).getDate(),
            status: leave.status,
            action: <LeaveButtons _id={leave._id} />,
          }));
          setLeaves(data);
          setFilteredLeave(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLeaveLoading(false);
      }
    };
    fetchLeave();
  }, []);

  useEffect(() => {
    const filterData = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLeave(filterData);
  }, [query, leaves]);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const filterByButton = (status) => {
    const filterData = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeave(filterData);
  };

  if (leaveLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center px-8 ">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search By employeeId"
          className="px-4 py-0.5 border"
        />
        <div className="space-x-3">
          <button
            className="px-2 py-1 bg-teal-500 text-white hover:bg-teal-600 rounded-md"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="px-2 py-1 bg-teal-500 text-white hover:bg-teal-600 rounded-md"
            onClick={() => filterByButton("Approved")}
          >
            Approved
          </button>
          <button
            className="px-2 py-1 bg-teal-500 text-white hover:bg-teal-600 rounded-md"
            onClick={() => filterByButton("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={AdminLeaveColumns}
          data={filteredLeave}
          pagination
        />
      </div>
    </div>
  );
};

export default Table;
