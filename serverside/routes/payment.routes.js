import express from 'express';
import { processPayment, CreateCheckoutSessions } from '../app/controllers/payment.controllers.js';
import authenticate from '../middlewares/authenticate.js';
import {validateCart} from '../middlewares/validateCart.js'

const router = express.Router();

router.post("/create-checkout-session",authenticate, validateCart, CreateCheckoutSessions)
router.post('/process', processPayment);

export default router;
