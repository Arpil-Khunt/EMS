export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "70px" },
  {
    name: "EMP ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "SALARY",
    selector: (row) => row.salary,
    width: "120px",
    sortable: true,
  },
  { name: "ALLOWANCE", selector: (row) => row.allowance, width: "120px" },
  {
    name: "DEDUCTION",
    selector: (row) => row.deduction,
    width: "120px",
    sortable: true,
  },

  { name: "TOTAL", selector: (row) => row.netSalary, width: "120px" },
  { name: "PAY DATE", selector: (row) => row.payDate, width: "120px" },
];
