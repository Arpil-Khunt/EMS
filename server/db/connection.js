import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb connected....");
  } catch (err) {
    console.log("Error Occur During DataBase connection: ", err);
  }
}
export default connectToDB;
