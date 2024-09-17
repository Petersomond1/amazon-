import express from 'express';
import { body } from 'express-validator';
import { register, login} from '../controllers/auth.controllers.js';
// import authenticate from '../middlewares/authenticate.js'
import {checkAuth } from '../utils/checkAuth.js'

const router = express.Router();

router.get('/checkAuth', checkAuth);

router.post('/register', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').not().isEmpty().withMessage(' name is required'),
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
], login);

// router.post('/logout', logout);

// router.post('/forgot-password', [
//     body('email').isEmail().withMessage('Valid email is required')
// ], forgotPassword);

// router.post('/reset-password', [
//     body('resetToken').not().isEmpty().withMessage('Reset token is required'),
//     body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
// ], resetPassword);

// router.get('/user', authenticate, getUser);

export default router;
