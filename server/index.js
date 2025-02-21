import express from "express";

import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
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

//database connection
connectToDB();

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
