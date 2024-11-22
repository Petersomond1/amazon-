import express from 'express'
import { fetchAllProductsByCategories, fetchAllProducts, createNewProduct } from '../app/controllers/product.controllers.js';
import authMiddleware from '../middlewares/authenticate.js';
import authorizeMiddleware from '../middlewares/authorize.js';
import uploadSingle from '../middlewares/multurMiddleware.js';

const router = express.Router();

router.post("/create", 
    uploadSingle,
    createNewProduct)

    
router.get('/', fetchAllProducts);

router.get('/category/:name', fetchAllProductsByCategories);




export default router;