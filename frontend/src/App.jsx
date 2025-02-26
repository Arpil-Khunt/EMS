import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBaseRoute from "./utils/RoleBaseRoute";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import EditDepartment from "./components/department/EditDepartment";
import AddDepartment from "./components/department/AddDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import SalaryHistory from "./components/salary/SalaryHistory";
import DefaultDashboard from "./pages/DefaultDashboard";
import EmployeeSummary from "./components/EmployeeDashboard/EmployeeSummary";
import EmployeeProfile from "./components/EmployeeDashboard/EmployeeProfile";
import AddLeaves from "./components/leave/AddLeaves";
import LeaveList from "./components/leave/List";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import LeaveDetails from "./components/leave/LeaveDetails";
import LeaveHistory from "./components/leave/LeaveHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultDashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/:_id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:_id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/salary/:_id"
            element={<SalaryHistory />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/leave/:_id"
            element={<LeaveHistory />}
          ></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:_id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>
          <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
          <Route
            path="/admin-dashboard/leaves/:_id"
            element={<LeaveDetails />}
          ></Route>
          <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<EmployeeSummary />}></Route>
          <Route
            path="/employee-dashboard/profile"
            element={<EmployeeProfile />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/add-leave"
            element={<AddLeaves />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/:_id"
            element={<SalaryHistory />}
          ></Route>
          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
