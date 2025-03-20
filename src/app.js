import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import dbConnect from "./config/database.js";
import bodyParser from "body-parser";
import logger from "../middleware/logger.js";

const app = express();
dotenv.config();
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    projectName: "Project Orange Store",
    message: "Hello, how are you?",
    port: PORT,
    environment: process.env.NODE_ENV || "development",
  });
});

//global middleware
// app.use(logger);

app.use(
  "/api/products",
  (req, res, next) => {
    console.log("Middleware Called for Products");
    next();
  },
  productRoutes
);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}...`);
});
