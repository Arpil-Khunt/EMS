// import * as dotenv from "dotenv";
// dotenv.config(); // Load environment variables from .env
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
// connectToDB();

app.get("/", (req, res) => {
  res.send("successfull");
});

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
