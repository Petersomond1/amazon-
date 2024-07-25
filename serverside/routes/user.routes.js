import express from 'express';
import { body, param } from 'express-validator';
import { getAllUsers, getUserById, updateUserRole, deleteUser} from '../controllers/user.controllers.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

// Get all users
router.get('/users',
    authenticate,
    authorize(['admin']),
    getAllUsers
);

// Get a single user by ID
router.get('/users/:id',
    authenticate,
    authorize(['admin']),
    // [
         param('id').isInt({ gt: 0 }).withMessage('Valid user ID is required'),
    // ],
    getUserById
);

// Update user role
router.put('/users/:id/role',
    authenticate,
    authorize(['admin']),
    // [
        param('id').isInt({ gt: 0 }).withMessage('Valid user ID is required'),
        body('role').notEmpty().withMessage('Role is required'),
    // ],
    updateUserRole
);

// Delete a user
router.delete('/users/:id',
    authenticate,
    authorize(['admin']),
    // [
        param('id').isInt({ gt: 0 }).withMessage('Valid user ID is required'),
    // ],
    deleteUser
);


export default router;