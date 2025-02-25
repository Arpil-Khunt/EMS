import React from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const EmployeeSummary = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
          <SummaryCard
            icon={<FaUsers />}
            text="Welcome Back"
            data={user.name}
            color="bg-teal-600"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
