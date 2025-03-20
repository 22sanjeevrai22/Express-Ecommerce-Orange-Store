import Product from "../models/Product.js";

const createProduct = async (data) => {
  try {
    const result = await Product.create(data);
    return result;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const productList = await Product.find();
    return productList;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    console.log("id", id);
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

const updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  } catch (error) {
    console.log("Error updating product by ID", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  console.log("deleted id", id);
  try {
    const result = await Product.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    console.log("Error deleting product by ID", error);
    throw error;
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
