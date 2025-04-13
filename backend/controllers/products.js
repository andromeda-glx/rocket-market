import { products as dbProducts } from "../database/products.js";
import Product from "../models/product.model.js";

let products = [...dbProducts];

export const getProducts = async (req, res) => {
  //   res.status(200).json({ success: true, data: products });
  //   res.end();
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in getProducts: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
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

export const deleteProduct = (req, res) => {
  const { productId } = req.params;
  let filteredList = products.filter((product) => product.id !== productId);

  if (filteredList.length !== products.length) {
    products = [...filteredList];
    res
      .status(200)
      .json({ success: true, message: "Product was deleted successfully." });
  } else {
    res.status(404).json({ success: false, message: "Product not found." });
  }
  res.end();
};

export const updateProduct = (req, res) => {
  const { productId } = req.params;
  const { name, price, img } = req.body;
  if (products.find((product) => product.id === productId)) {
    products = products.map((product) =>
      product.id === productId ? { id: productId, name, price, img } : product
    );
    res
      .status(200)
      .json({ success: true, data: { id: productId, name, price, img } });
  } else {
    res.status(404).json({ success: false, message: "Product not found." });
  }
  res.end();
};
