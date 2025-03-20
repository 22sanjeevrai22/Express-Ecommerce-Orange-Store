import express from "express";
import {
  createProductController,
  updateProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
} from "../controllers/productController.js";
import auth from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.post("/", auth, createProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
