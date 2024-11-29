import express from 'express';
import {CreateCheckoutSessions , handleStripeWebhook} from '../app/controllers/payment.controllers.js';
import authenticate from '../middlewares/authenticate.js';
import {validateCart} from '../middlewares/validateCart.js'


const router = express.Router();

router.post("/create-checkout-session",authenticate, validateCart, CreateCheckoutSessions)
router.post('/webhook',express.raw({type:'application/json'}), handleStripeWebhook);

export default router;
