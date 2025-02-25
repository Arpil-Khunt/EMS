import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { columns } from "../../utils/SalaryHelper";
import DataTable from "react-data-table-component";

const SalaryHistory = () => {
  const [salLoading, setSalLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [salaryData, setSalaryData] = useState([]);
  const { _id } = useParams();
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    const fetchSalary = async () => {
      setSalLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/salary/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const salaryList = response.data.findSalary || [];

          let sno = 1;
          const data = await salaryList.map((salary) => {
            return {
              sno: sno++,
              employeeId: salary.employeeId.employeeId,
              salary: salary.basicSalary,
              allowance: salary.allowances,
              deduction: salary.deduction,
              netSalary: salary.netSalary,
              payDate: new Date(salary.payDate).toLocaleDateString("en-CA"),
              payDateRaw: new Date(salary.payDate),
            };
          });
          setSalaryData(data);
          setFilteredSalaries(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("please check you network connect, server side error");
        }
      } finally {
        setSalLoading(false);
      }
    };
    fetchSalary();
  }, [_id]);

  useEffect(() => {
    const filterSalary = () => {
      const q = query.toLowerCase();
      const filtered = salaryData.filter((salary) => {
        return salary.employeeId.toLowerCase().includes(q.toLowerCase());
      });
      setFilteredSalaries(filtered);
    };
    filterSalary();
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  };

  // useEffect(() => {
  //     if (startDate && endDate) {
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     const data = salaryData.filter((item) => {
  //         const payDate = item.payDateRaw;
  //         return payDate >= start && payDate <= end;
  //     });
  //     setFilteredSalaries(data);
  //     } else {
  //     setFilteredSalaries(salaryData); // Reset to original data when dates are cleared
  //     }
  // }, [startDate, endDate, salaryData]); // Add dependencies

  return (
    <>
      {salLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Salary History</h3>
          </div>
          <div className="flex justify-between items-center px-8">
            <input
              type="text"
              placeholder="search By Employee ID"
              className="px-4 py-0.5 border"
              value={query}
              onChange={handleChange}
            />
            {/* <div>
                <label>Start Date:</label>
                <input type="date" onChange={handleStartDate} />
                </div>
                <div>
                <label>End Date:</label>
                <input type="date" onChange={handleEndDate} />
                </div> */}
          </div>
          <div className="mt-5 px-8">
            <DataTable
              columns={columns}
              data={filteredSalaries}
              pagination
              noDataComponent={
                salaryData.length === 0 ? (
                  <p className="text-center mt-4">No payment made</p>
                ) : null
              } //Custom noDataComponent
              noHeader={false} // Always show header
              customStyles={customStyles}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryHistory;
