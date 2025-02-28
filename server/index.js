import express from "express";

import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import summaryRouter from "./routes/summary.js";
import attendanceRouter from "./routes/attendance.js";
const app = express();
const PORT = process.env.PORT;
import connectToDB from "./db/connection.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", summaryRouter);
app.use("/api/attendance", attendanceRouter);

//database connection
connectToDB();

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
