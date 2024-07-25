import express from 'express';
import { body } from 'express-validator';
import { register, login, logout, forgotPassword, resetPassword, getUser } from '../controllers/auth.controllers.js';
import authenticate from '../middlewares/authenticate.js'

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('street').not().isEmpty().withMessage('Address is required'),
    body('apartment').not().isEmpty().withMessage('Apartment is required'),
    body('city').not().isEmpty().withMessage('City is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('zip').not().isEmpty().withMessage('Zip code is required')
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
], login);

router.post('/logout', logout);

router.post('/forgot-password', [
    body('email').isEmail().withMessage('Valid email is required')
], forgotPassword);

router.post('/reset-password', [
    body('resetToken').not().isEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], resetPassword);

router.get('/user', authenticate, getUser);

export default router;
