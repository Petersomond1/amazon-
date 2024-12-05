import express from 'express';
import {CreateCheckoutSessions } from '../app/controllers/payment.controllers.js';
import authenticate from '../middlewares/authenticate.js';
import {validateCart} from '../middlewares/validateCart.js'


const router = express.Router();

router.post("/create-checkout-session",authenticate, validateCart, CreateCheckoutSessions)

export default router;
