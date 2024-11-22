import express from 'express';
import { 
    register, 
    login,
    logout,
    forgotPassword,
    resetPassword
} from '../app/controllers/auth.controllers.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
