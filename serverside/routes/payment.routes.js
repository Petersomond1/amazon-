import express from 'express';
import { processPayment } from '../app/controllers/payment.controllers.js';

const router = express.Router();

router.post('/process', processPayment);

export default router;
