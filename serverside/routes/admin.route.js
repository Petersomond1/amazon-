import express from "express";
import { selectProductsid, GetFeaturedIds } from "../controllers/admin.controller.js";

const router = express.Router();

router.post(
    '/submitid', selectProductsid
)

router.get('/get-featured-ids', GetFeaturedIds)
        

export default router;
