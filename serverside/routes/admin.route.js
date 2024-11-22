import express from "express";
import { selectProductsid, GetFeaturedIds, getAllUsers } from "../app/controllers/admin.controller.js";
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.post('/submitid', authenticate, authorize(['admin']), selectProductsid)
router.get('/get-featured-ids', authenticate, authorize(['admin']), GetFeaturedIds)
router.get('/users',authenticate, authorize(['admin']),getAllUsers);


export default router;
