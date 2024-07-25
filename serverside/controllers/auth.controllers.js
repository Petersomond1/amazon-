import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js'; 
import handleError from '../utils/handleError.js';
import { validationResult } from 'express-validator';
import crypto from 'crypto';

// Utility function to create a token
const createToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Register user
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, firstName, lastName, phone, street, apartment, city, country, zip } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const name = `${firstName} ${lastName}`;
        const query = 'INSERT INTO users (name, email, passwordHash, street, apartment, city, zip, country, phone, role, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [name, email, passwordHash, street, apartment, city, zip, country, phone, 'admin', 1];
// OR ALso, change 'values' to [name, email, passwordHash, street, apartment, city, zip, country, phone, 'client', 0]
        const [result] = await db.execute(query, values);

        const user = {
            id: result.insertId,
            email: email,
            // role: 'client',
            // isAdmin: 0 
            // OR uncomment the above lines and comment the below lines to set the role and isAdmin values. 
            role: 'admin',
            isAdmin: 1 
        };

        const token = createToken(user);

        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Login a user
export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const userPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin
        };
 //Common roles might include client, admin, moderator, editor, etc.
    
        const token = createToken(userPayload);

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        handleError(error, req, res);
    }
};
           

// Logout a user
export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        // Store the reset token in the database
        const updateQuery = 'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?';
        await db.execute(updateQuery, [resetToken, resetTokenExpiry, email]);

        // Send the reset token to the user's email (pseudo code)
        // sendEmail(user.email, 'Password Reset', `Your reset token is ${resetToken}`);

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { resetToken, newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const query = 'SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?';
        const [rows] = await db.execute(query, [resetToken, Date.now()]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const updateQuery = 'UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?';
        await db.execute(updateQuery, [hashedPassword, user.id]);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Get user details
export const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.execute('SELECT id, name, email, role, isAdmin FROM users WHERE id = ?', [userId]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        handleError(error, req, res);
    }
};



// Improvements:
// Enhanced Error Handling: Use a consistent error-handling strategy.
// Security Improvements: Ensure token-related operations are secure and tokens are handled properly.
// Async/Await Consistency: Make sure all asynchronous operations are properly awaited.
// Validation: Add input validation to ensure the integrity of the data.
// Password Reset: Add a complete implementation of password reset functionality.
// Code Organization: Improve the readability and organization of the code.
// Explanation of Enhancements
// Validation: Using express-validator to validate inputs for each route.
// Utility Function: createToken to centralize token creation logic.
// Forgot Password: Added token generation and expiry handling.
// Reset Password: Added validation and token verification logic.
// Error Handling: Consistently using handleError for error responses.