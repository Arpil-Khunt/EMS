import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
const app = express();
const PORT = process.env.PORT;
import connectToDB from "./db/connection.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);

//database connection
connectToDB();

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
