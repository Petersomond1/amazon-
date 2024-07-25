import express from 'express';
import { getProduct, getProducts, searchProducts, filterProducts, getCategories } from '../controllers/client.controllers.js';

const router = express.Router();

router.get('/product/:id', getProduct);
router.get('/products', getProducts);
router.get('/search', searchProducts);
router.get('/filter', filterProducts);
router.get('/categories', getCategories);

export default router;
