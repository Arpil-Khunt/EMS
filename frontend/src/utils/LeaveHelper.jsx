import { useNavigate } from "react-router-dom";

export const columns = [
  { name: "SNO", selector: (row) => row.sno, width: "100px" },
  {
    name: "LEAVE TYPE",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  { name: "FROM", selector: (row) => row.from, sortable: true, width: "140px" },
  { name: "TO", selector: (row) => row.to, width: "140px" },
  {
    name: "DESCRIPTION",
    selector: (row) => row.description,
    cell: (row) => (
      <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {row.description}
      </div>
    ),
    width: "300px",

    sortable: true,
  },

  { name: "APPLIED DATE", selector: (row) => row.appliedDate, width: "160px" },
  { name: "STATUS", selector: (row) => row.status, width: "140px" },
];

export const AdminLeaveColumns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "90px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "220px",
  },

  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "170px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "180px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "120px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  {
    name: "Action",
    cell: (row) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {row.action}
      </div>
    ),
  },
];

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleView = (_id) => {
    navigate(`/admin-dashboard/leaves/${_id}`);
  };
  return (
    <button
      className="px-4 py-1 bg-teal-500 text-white hover:bg-teal-600 rounded-md"
      onClick={() => handleView(_id)}
    >
      View
    </button>
  );
};
