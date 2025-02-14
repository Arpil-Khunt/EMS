import User from "./models/user.js";
import bcrypt from "bcrypt";
import connectToDB from "./db/connection.js";

const userRegister = async () => {
  connectToDB();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = await new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (err) {
    console.log("some error occur", err);
  }
};

userRegister();
