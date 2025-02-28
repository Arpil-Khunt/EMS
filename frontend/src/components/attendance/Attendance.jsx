import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

import { columns, AttendanceButtons } from "../../utils/attendanceHelper";

const Attendance = () => {
  const [attendace, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredAttendance, setFilteredAttendace] = useState(null); // Departments after filtering

  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((atd) => ({
          employeeId: atd.employeeId.employeeId,
          sno: sno++,

          department: atd.employeeId.department.dep_name,
          name: atd.employeeId.userId.name.toUpperCase(),

          action: (
            <AttendanceButtons
              employeeId={atd.employeeId}
              status={atd.status}
              statusChange={statusChange}
            />
          ),
        }));
        setAttendance(data);
        setFilteredAttendace(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    const records = attendace.filter(
      (record) =>
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.department.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAttendace(records);
  }, [query, attendace]); // Add departments to the dependency array

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  if (!filteredAttendance) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Attendance</h3>
          </div>
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="search By Employee Name or Department"
              className="px-4 py-0.5 border"
              value={query}
              onChange={handleChange}
            />
            <p className="text-2xl">
              Mark Employees for{" "}
              <span className=" font-bold underline">
                {new Date().toISOString().split("T")[0]}
              </span>
            </p>
            <Link
              to="/admin-dashboard/attendance-report"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Attendance Report
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredAttendance} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
