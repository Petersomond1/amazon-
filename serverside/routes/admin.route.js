import express from "express";
import { selectProductsid, GetFeaturedIds } from "../controllers/admin.controller.js";
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';
import { getAllUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.post(
    '/submitid', selectProductsid
)

router.get('/get-featured-ids', GetFeaturedIds)
        


// Get all users
router.get('/users',
    // authenticate,
    // authorize(['admin']),
    getAllUsers
);


export default router;
