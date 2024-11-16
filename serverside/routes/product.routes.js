import express from 'express'
import { fetchAllProductsByCategories, fetchAllProducts, createNewProduct } from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/authenticate.js';
import authorizeMiddleware from '../middlewares/authorize.js';
import { handleUpload, uploadMiddleware } from '../middlewares/uploadImage.js';

const router = express.Router();

router.post("/create", 
    //authMiddleware, authorizeMiddleware(['admin']),
    handleUpload('image'), 
    createNewProduct)
router.get('/', fetchAllProducts);

router.get('/categories/:name', fetchAllProductsByCategories);




export default router;