import axios from "axios";

const url = "http://localhost:5000/api/products";

export async function getProducts() {
  const { data } = await axios.get(url);
  return data;
}

export async function createProduct(product) {
  const res = await axios.post(url, product);
  return res.data;
}

export async function updateProduct(productId, data) {
  const res = await axios.put(`${url}/${productId}`, data);
  return res;
}

export async function deleteProduct(productId) {
  const res = await axios.delete(`${url}/${productId}`);
  return res;
}
