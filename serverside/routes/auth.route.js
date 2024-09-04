import express from 'express';
import {checkAuth } from '../utils/checkAuth.js'

const router = express.Router();

router.get('/checkAuth', checkAuth);



export default router;