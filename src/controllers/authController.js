import { formatUserData } from "../../helpers/dataFormatter.js";
import authService from "../services/authService.js";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from "../utils/regex/userRegex.js";

const loginController = async (req, res) => {
  try {
    const data = req.body;
    const { email, phone, password } = data;
    if (!email && !phone)
      return res.status(422).send("Email or Phone is required!");

    if (!password) return res.status(422).send("Password is required!");

    const user = await authService.login(data);

    res
      .status(200)
      .json({ message: "Login Successful!!", user: formatUserData(user) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, password, confirmPassword, email, phone } = req.body;

    // Collect errors
    const errors = [];

    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
    if (!phone) errors.push("Phone number is required");
    if (!password) errors.push("Password is required");
    if (!confirmPassword) errors.push("Confirm password is required");
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("Passwords do not match");
    }
    if (!EMAIL_REGEX.test(email)) errors.push("Invalid email format!");
    if (!PASSWORD_REGEX.test(password))
      errors.push(
        "Password must be at least 8 characters and include letters and numbers!"
      );
    if (!PHONE_REGEX.test(phone)) errors.push("Invalid phone format!");

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    const user = await authService.register(req.body);
    return res
      .status(201)
      .json({
        message: "Registration Successful!",
        user: formatUserData(user),
      });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";

    if (error.name === "ValidationError") {
      statusCode = 400;
      errorMessage = error.message; // 400: Bad Request (Mongoose validation error)
    } else if (error.code === 11000) {
      statusCode = 409;
      errorMessage = "Email or phone already exists!!"; // 409: Conflict (Duplicate Entry)
    }

    console.error("Register Error:", error);
    return res.status(statusCode).json({ error: errorMessage });
  }
};

export { loginController, registerController };
