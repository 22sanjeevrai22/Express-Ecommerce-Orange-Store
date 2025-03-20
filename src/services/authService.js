import User from "../models/User.js";
import bcrypt from "bcryptjs";

const login = async (data) => {
  const { email, phone, password } = data;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (!user) throw new Error("User not found!");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Credentials do not match!!");
    }
    return user;
  } catch (error) {
    console.log("Error during login", error);
    throw error;
  }
};

const register = async (data) => {
  try {
    const { name, password, address, email, phone } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      password: hashedPassword,
      address,
      email,
      phone,
    });

    // Modify the user object before saving (optional) This is the advantage of making new instance of user and saving
    // user.roles = ["Super Admin"];
    return await newUser.save();
  } catch (error) {
    console.log("Error during User Registration", error);
    throw error;
  }
};

export default { register, login };
