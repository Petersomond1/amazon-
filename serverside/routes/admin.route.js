import express from "express";
import { selectProductsid } from "../controllers/admin.controller.js";

const router = express.Router();

router.post(
    '/submitid', selectProductsid
)


export default router;
