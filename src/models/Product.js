import mongoose from "mongoose";
import { IMAGE_URL_REGEX } from "../utils/regex/productRegex.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"], // Custom error message
    trim: true, // Removes leading/trailing spaces
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [100, "Name must be at most 100 characters long"],
  },
  brand: {
    type: String,
    trim: true,
    default: "Generic", // Default brand if none is provided
  },
  category: {
    type: String,
    required: true,
    // enum: ["Electronics", "Clothing", "Books", "Food", "Other"],
    default: "Generic",
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"], // Validation for non-negative price
    max: [100000, "Price is too high!"], // Max price validation
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock cannot be negative"],
    default: 0, // Default stock to 0
  },
  rating: {
    type: Number,
    min: [0, "Rating cannot be below 0"],
    max: [5, "Rating cannot be above 5"],
    default: 0,
  },
  imageUrls: {
    type: [String], // Fix: `String` should be capitalized!
    validate: {
      validator: function (arr) {
        return arr.every((url) => IMAGE_URL_REGEX);
      },
      message: "Invalid image URL format",
    },
  },
  description: {
    type: String,
    trim: true,
    minLength: [5, "Description is too short"],
    maxlength: [1000, "Description is too long!"],
  },
  // sku: {
  //   type: String,
  //   unique: true, // Ensures SKU is unique
  //   required: [true, "SKU is required"],
  //   uppercase: true, // Converts SKU to uppercase
  //   match: [/^[A-Z0-9-]+$/, "Invalid SKU format"], // Allows only alphanumeric & dashes
  // },
  // discount: {
  //   type: Number,
  //   min: [0, "Discount cannot be negative"],
  //   max: [100, "Discount cannot be more than 100%"],
  //   default: 0,
  // },
  // reviews: [
  //   {
  //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //     comment: { type: String, trim: true },
  //     rating: {
  //       type: Number,
  //       min: [0, "Rating must be at least 0"],
  //       max: [5, "Rating cannot exceed 5"],
  //     },
  //     createdAt: { type: Date, default: Date.now },
  //   },
  // ],
  // isFeatured: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevents changes after creation
  },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const model = mongoose.model("Product", productSchema);

export default model;
