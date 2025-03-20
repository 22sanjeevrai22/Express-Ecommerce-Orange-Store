import express from "express";
import {
  getAllUsersController,
  createUserController,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/", getAllUsersController);
router.post("/", createUserController);

export default router;
