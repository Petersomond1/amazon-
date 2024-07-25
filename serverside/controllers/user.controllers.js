import db from '../config/db.js';
import handleError from '../utils/handleError.js';
import { validationResult } from 'express-validator';


// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, name, email, role, FROM users');
        // i removed the created_at field from the query for i have to include it in the database fields
        res.status(200).json(rows);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT id, name, email, role, FROM users WHERE id = ?', [id]);
 // i removed the created_at field from the query

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Update user role
export const updateUserRole = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { role } = req.body;

        const query = 'UPDATE users SET role = ? WHERE id = ?';
        const values = [role, id];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};
