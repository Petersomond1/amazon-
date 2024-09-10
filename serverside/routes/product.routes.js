import express from 'express'
import { fetchAllProductsByCategories, fetchAllProducts } from '../controllers/product.controller.js';

const router = express.Router();


router.get('/', fetchAllProducts);

router.get('/categories/:name', fetchAllProductsByCategories);




export default router;