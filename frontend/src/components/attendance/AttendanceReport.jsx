import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(skip);
  const fetchReport = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ limit, skip });
      console.log("from fetchAttendance", skip);
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(
        `http://localhost:8080/api/attendance/attendance-report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevReport) => ({
            ...prevReport,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip((preSkip) => preSkip + limit);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="min-h-screen p-10 bg-white">
        <h2 className="text-center text-2xl font-bold">Attendance Report</h2>
        <div>
          <h2 className=" text-xl font-semibold">Filter By Date</h2>
          <input
            type="date"
            className="p-2 border border-gray-100 rounded-md"
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSkip(0);
            }}
            value={dateFilter}
            placeholder="Enter Date"
          />
        </div>
        {Object.entries(report).map(([date, record], idx) => (
          <div key={date} className="mt-4 border-box">
            <h2 className="text-xl font-semibold">{date}</h2>
            <table
              className="w-full border border-gray-200"
              border="1"
              cellPadding="10"
            >
              <thead>
                <tr>
                  <th className="border border-gray-200">S.No</th>
                  <th className="border border-gray-200">Employee ID</th>
                  <th className="border border-gray-200">Name</th>
                  <th className="border border-gray-200">Department</th>
                  <th className="border border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.map((item, index) => (
                  <tr key={item.employeeId}>
                    <td className="border border-gray-200">{index + 1}</td>
                    <td className="border border-gray-200">
                      {item.employeeId}
                    </td>
                    <td className="border border-gray-200">
                      {item.employeeName}
                    </td>
                    <td className="border border-gray-200">
                      {item.departmentName}
                    </td>
                    <td className="border border-gray-200">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <button
          className="px-4 py-2 border bg-gray-100 text-lg font-semibold"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default AttendanceReport;
