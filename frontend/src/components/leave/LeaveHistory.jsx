import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { columns } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const LeaveHistory = () => {
  const { _id } = useParams();
  const [leave, setLeave] = useState([]);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [leaveFiltered, setLeaveFiltered] = useState([]);
  const [query, setQuery] = useState("");

  const customStyles = {
    rows: {
      style: {
        minHeight: "48px", // Adjust row height as needed
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)", // Subtle hover effect
        },
      },
    },
    headCells: {
      style: {
        paddingLeft: "21px", // Adjust header cell padding
        paddingRight: "21px",
        fontWeight: "600", // Semi-bold font weight
        fontSize: "1rem",
        color: "#374151", // Dark gray text color
      },
    },
    cells: {
      style: {
        paddingLeft: "21px", // Adjust cell padding
        paddingRight: "21px",
        fontSize: "0.9rem",
        color: "#4B5563", // Slightly lighter gray text color
      },
    },
    pagination: {
      style: {
        marginTop: "1rem",
      },
    },
  };

  useEffect(() => {
    setLeaveLoading(true);
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/leave/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const leaveData = response.data.leaves;

          let sno = 1;
          const data = leaveData.map((leave) => ({
            sno: sno++,
            leaveType: leave.leaveType,
            from: new Date(leave.startDate).toLocaleDateString("en-CA"),
            to: new Date(leave.endDate).toLocaleDateString("en-CA"),
            description: leave.reason,
            appliedDate: new Date(leave.appliedAt).toLocaleDateString("en-CA"),
            status: leave.status,
          }));
          setLeave(data);
          setLeaveFiltered(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Check your connection or server error.");
        }
      } finally {
        setLeaveLoading(false);
      }
    };
    fetchLeave();
  }, []);

  useEffect(() => {
    const filterData = leave.filter((leave) =>
      leave.status.toLowerCase().includes(query.toLowerCase())
    );
    setLeaveFiltered(filterData);
  }, [query, leave]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  if (leaveLoading) {
    return <div>Loading...0</div>;
  }
  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leaves History</h3>
      </div>
      <div className="flex justify-between items-center px-8">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search By Status"
          className="px-4 py-0.5 border"
        />
      </div>
      <div className="mt-5 px-8">
        <DataTable
          columns={columns}
          data={leaveFiltered}
          pagination
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default LeaveHistory;
