import express from 'express';
import { body, param } from 'express-validator';
import { addItemToCart, getCartItems, updateCartItemQuantity, removeCartItem } from '../app/controllers/cart.controllers.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/',authenticate,getCartItems);
router.post('/add', authenticate, addItemToCart);
router.put('/:id', authenticate,updateCartItemQuantity);
router.delete('/:id',authenticate,removeCartItem);

export default router;
