import { products as dbProducts } from "../database/products.js";

let products = [...dbProducts];

export const getProducts = (req, res) => {
  res.status(200).json({ success: true, data: products });
  res.end();
};

export const postProduct = (req, res) => {
  const data = req.body;
  data.id = crypto.randomUUID();
  products.push(data);
  res.status(200).json({ success: true, data });
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
  if (products.find(product => product.id === productId)) {
    products = products.map((product) =>
      product.id === productId ? { id: productId, name, price, img } : product
    );
    res.status(200).json({ success: true, data: { id: productId, name, price, img } });
  } else {
    res.status(404).json({ success: false, message: "Product not found." });
  }
  res.end();
};
