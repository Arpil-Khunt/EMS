import User from "../models/user.js";
import bcrypt from "bcrypt";

export const setPassword = async (req, res) => {
  try {
    const { _id } = req.user; //userId
    const { oldPassword, newPassword } = req.body;

    const findUser = await User.findById(_id);
    if (!findUser) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    const currPassword = findUser.password;
    const isMatch = await bcrypt.compare(oldPassword, currPassword);
    if (isMatch) {
      const hashPass = await bcrypt.hash(newPassword, 10);
      const updatePassword = await User.findByIdAndUpdate(
        { _id },
        { $set: { password: hashPass } }
      );
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "wrong old password" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "password not changed, server side error",
    });
  }
};
