import express from 'express';
import { body } from 'express-validator';
import { addRowsIds, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controllers.js';
import authenticate from '../middlewares/authenticate.js'
import authorize from '../middlewares/authorize.js'

const router = express.Router();

// Only admin users should be able to create, update, and delete products
const adminRole = ['admin'];

router.post('/row_ids', authenticate, authorize(adminRole), addRowsIds);
 
router.post('/',
    authenticate,
    authorize(adminRole),
    [
        body('name').not().isEmpty().withMessage('Product name is required'),
        body('description').not().isEmpty().withMessage('Product description is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Valid price is required'),
        body('sales_price').not().isEmpty().withMessage('Product sales_price is required'),
        body('quantity_InStock').isInt({ gt: 0 }).withMessage('Valid stock quantity is required'),
        body('image').not().isEmpty().withMessage('Product image URL is required'),
        body('image_a').not().isEmpty().withMessage('Product image URL is required'),
        body('image_b').not().isEmpty().withMessage('Product image URL is required'),
        body('image_c').not().isEmpty().withMessage('Product image URL is required'),
        body('video_image').not().isEmpty().withMessage('Product image URL is required'),
        body('category').not().isEmpty().withMessage('Product category is required'),
        body('type').not().isEmpty().withMessage('Product type is required'),
        body('ratings').not().isEmpty().withMessage('Product ratings is required'),
        body('reviews').not().isEmpty().withMessage('Product reviews is required'),
        body('prime').not().isEmpty().withMessage('Product prime is required'),
        body('soldby').not().isEmpty().withMessage('Product soldby is required'),
        body('featured').not().isEmpty().withMessage('Product featured is required')
    ],
    createProduct
);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put("/:id",
    authenticate,
    authorize(adminRole),
    [
        body('name').not().isEmpty().withMessage('Product name is required'),
        body('description').not().isEmpty().withMessage('Product description is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Valid price is required'),
        body('sales_price').not().isEmpty().withMessage('Product sales_price is required'),
        body('quantity_InStock').isInt({ gt: 0 }).withMessage('Valid stock quantity is required'),
        body('image').not().isEmpty().withMessage('Product image URL is required'),
        body('image_a').not().isEmpty().withMessage('Product image URL is required'),
        body('image_b').not().isEmpty().withMessage('Product image URL is required'),
        body('image_c').not().isEmpty().withMessage('Product image URL is required'),
        body('video_image').not().isEmpty().withMessage('Product image URL is required'),
        body('category').not().isEmpty().withMessage('Product category is required'),
        body('type').not().isEmpty().withMessage('Product type is required'),
        body('ratings').not().isEmpty().withMessage('Product ratings is required'),
        body('reviews').not().isEmpty().withMessage('Product reviews is required'),
        body('prime').not().isEmpty().withMessage('Product prime is required'),
        body('soldby').not().isEmpty().withMessage('Product soldby is required'),
        body('featured').not().isEmpty().withMessage('Product featured is required')
    ],
    updateProduct
);

router.delete('/:id',
    authenticate,
    authorize(adminRole),
    deleteProduct
);

export default router;
