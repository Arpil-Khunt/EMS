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
