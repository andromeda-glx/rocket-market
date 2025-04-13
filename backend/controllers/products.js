import { products as dbProducts } from "../database/products.js";
import Product from "../models/product.model.js";

let products = [...dbProducts];

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in getProducts: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }

  res.end();
};

export const postProduct = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided." });
  }

  if (!data.name || !data.price || !data.img) {
    return res
      .status(400)
      .json({ success: false, message: "Please add all fields." });
  }

  const product = new Product(data);

  try {
    await product.save(); // saves the product to the database
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(`Error in postProduct: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }

  res.end();
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "No product ID provided." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId); // Delete the product from the database
    if (!deletedProduct) {
      res.status(404).json({ success: false, message: "Product not found." });
    } else {
      res.status(200).json({ success: true, data: deletedProduct });
    }
  } catch (error) {
    console.error(`Error in deleteProduct: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }

  res.end();
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const data = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {new: true}); // Update the product in the database and return the updated product. If the product is not found, it returns null.
    if (!updatedProduct) {
      res.status(404).json({ success: false, message: "Product not found." });
    } else {
      res.status(200).json({ success: true, data: updatedProduct });
    }
  } catch (error) {
    console.error(`Error in updateProduct: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
  res.end();
};
