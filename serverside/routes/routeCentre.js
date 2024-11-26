import express from 'express';
import authRoutes from './auth.route.js';
import productRoutes from './product.routes.js';
import adminRoutes from './admin.route.js';
import clientRoutes from './client.route.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';
import paymentRoute from './payment.routes.js'
//import verify from './verify.js'

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/client', clientRoutes);
router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/payment', paymentRoute)
//router.use('/verify', verify);


export default router;