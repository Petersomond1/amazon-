import express from 'express'
import { getHomeProducts, getHomeCategories } from '../app/controllers/client.controller.js';

const router = express.Router();


router.get('/home-products', getHomeProducts);
router.get('/home-categories', getHomeCategories);



export default router;