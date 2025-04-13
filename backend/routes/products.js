import express from 'express';
import { deleteProduct, getProducts, postProduct, updateProduct } from '../controllers/products.js';

const router = express.Router();

router.route("/").get(getProducts).post(postProduct);
router.route("/:productId").delete(deleteProduct).put(updateProduct);

export default router;