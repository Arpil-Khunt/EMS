export const columns = [
  { name: "S NO", selector: (row) => row.sno, width: "100px" },
  {
    name: "EMP ID",
    selector: (row) => row.employeeId,
    width: "150px",
  },
  {
    name: "SALARY",
    selector: (row) => row.salary,
    width: "150px",
    sortable: true,
  },
  { name: "ALLOWANCE", selector: (row) => row.allowance, width: "150px" },
  {
    name: "DEDUCTION",
    selector: (row) => row.deduction,
    width: "170px",
    sortable: true,
  },

  { name: "TOTAL", selector: (row) => row.netSalary, width: "150px" },
  { name: "PAY DATE", selector: (row) => row.payDate, width: "150px" },
];
