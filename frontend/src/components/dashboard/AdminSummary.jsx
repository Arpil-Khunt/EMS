import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import axios from "axios";
const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:8080/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (summary.data.success) {
          setSummary(summary);
        }
      } catch (error) {
        if (error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("check your connection or server side error");
        }
      }
    };
    fetchSummary();
  }, []);
  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div>
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SummaryCard
            icon={<FaUsers />}
            text="Total Employees"
            number={summary.data.totalEmployees}
            color="bg-teal-600"
          />

          <SummaryCard
            icon={<FaBuilding />}
            text="Total Departments"
            number={summary.data.totalDepartments}
            color="bg-yellow-600"
          />

          <SummaryCard
            icon={<FaMoneyBillTrendUp />}
            text="Monthly Pay"
            number={summary.data.totalSalary}
            color="bg-red-600"
          />
        </div>

        <div className="mt-12">
          <h4 className="text-center text-2xl font-bold">Leave Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard
              icon={<FaFileAlt />}
              text="Leave Applied"
              number={summary.data.leaveSummary.appliedFor}
              color="bg-teal-600"
            />

            <SummaryCard
              icon={<FaCheckCircle />}
              text="Leave Approved"
              number={summary.data.leaveSummary.approved}
              color="bg-green-600"
            />

            <SummaryCard
              icon={<FaHourglassHalf />}
              text="Leave Pending"
              number={summary.data.leaveSummary.pending}
              color="bg-yellow-600"
            />

            <SummaryCard
              icon={<FaTimesCircle />}
              text="Leave Rejected"
              number={summary.data.leaveSummary.rejected}
              color="bg-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
