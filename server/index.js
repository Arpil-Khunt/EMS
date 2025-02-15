// import * as dotenv from "dotenv";
// dotenv.config(); // Load environment variables from .env
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
const app = express();
const PORT = process.env.PORT;
import connectToDB from "./db/connection.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);

//database connection
connectToDB();

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
