import productService from "../services/productService.js";

const getAllProductsController = async (req, res) => {
  try {
    const productList = await productService.getAllProducts();
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProductController = async (req, res) => {
  const data = req.body;
  try {
    const result = await productService.createProduct(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProductByIdController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not foundd.." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductController = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const product = await productService.updateProduct(id, body);
    if (!product) {
      res.status(404).json({ error: "Product not foundd.." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductController = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await productService.deleteProduct(id);
    console.log(deleted);
    if (deleted) {
      res.status(200).json({ message: `Deleted product of id: ${id}` });
    } else {
      res.status(404).json({ error: `Product with id ${id} not found` });
    }
  } catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllProductsController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
