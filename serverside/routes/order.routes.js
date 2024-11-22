import express from 'express';
import { body, param } from 'express-validator';
import { createOrder, getAllOrdersForUser, getOrderById, updateOrder, deleteOrder } from '../app/controllers/order.controllers.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Create an order
router.post('/',
    authenticate,
    [
        body('shipping_address').notEmpty().withMessage('Shipping address is required')
    ],
    createOrder
);

// Get all orders for a user
router.get('/',
    authenticate,
    getAllOrdersForUser
);

// Get a single order by ID
router.get('/:id',
    authenticate,
    [
        param('id').isInt({ gt: 0 }).withMessage('Valid order ID is required')
    ],
    getOrderById
);

// Update an order
router.put('/:id',
    authenticate,
    [
        param('id').isInt({ gt: 0 }).withMessage('Valid order ID is required'),
        body('quantity').optional().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
        body('total_price').optional().isFloat({ gt: 0 }).withMessage('Total price must be a positive number'),
        body('status').optional().notEmpty().withMessage('Status is required')
    ],
    updateOrder
);

// Delete an order
router.delete('/:id',
    authenticate,
    [
        param('id').isInt({ gt: 0 }).withMessage('Valid order ID is required')
    ],
    deleteOrder
);

export default router;
