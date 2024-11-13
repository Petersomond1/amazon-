import express from 'express'
import { fetchAllProductsByCategories, fetchAllProducts, createNewProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post("/create", createNewProduct)
router.get('/', fetchAllProducts);

router.get('/categories/:name', fetchAllProductsByCategories);




export default router;