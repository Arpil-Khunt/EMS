import axios from "axios";

export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "100px" },
  { name: "Name", selector: (row) => row.name, width: "200px", sortable: true },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    width: "200px",
    sortable: true,
  },
  { name: "Department", selector: (row) => row.department, width: "170px" },

  { name: "Action", selector: (row) => row.action, center: "true" },
];

export const AttendanceButtons = ({ employeeId, status, statusChange }) => {
  const handleClick = async (employeeId, status) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return;
    }
    const response = await axios.put(
      "http://localhost:8080/api/attendance/mark-attendance",
      { employeeId, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      statusChange();
    } else {
      // error
      alert(response.data.error);
    }
  };
  return (
    <>
      {status == null ? (
        <div className="flex space-x-3">
          <button
            className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 rounded-md"
            onClick={() => handleClick(employeeId, "Present")}
          >
            Present
          </button>
          <button
            className="px-4 py-1 bg-red-500 text-white hover:bg-red-600 rounded-md"
            onClick={() => handleClick(employeeId, "Absent")}
          >
            Absent
          </button>
          <button
            className="px-4 py-1 bg-gray-500 text-white hover:bg-gray-600 rounded-md"
            onClick={() => handleClick(employeeId, "Sick")}
          >
            Sick
          </button>
          <button
            className="px-4 py-1 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md"
            onClick={() => handleClick(employeeId, "Leave")}
          >
            Leave
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-1 bg-gray-400 text-white  rounded-md"
          disabled
        >
          {status}
        </button>
      )}
    </>
  );
};
