import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
