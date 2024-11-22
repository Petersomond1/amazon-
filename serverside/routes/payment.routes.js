import express from 'express';
import { processPayment } from '../controllers/payment.js';

const router = express.Router();

router.post('/process', processPayment);

export default router;
