import db from '../../config/db.js';
import { validationResult } from 'express-validator';
import { addItemToCartService } from '../services/cartServices.js';

// Add an item to the cart
export const addItemToCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const result = await addItemToCartService(req.body.products, user_id);
        console.log("here")

        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
    }
};

// Get cart items for a user
export const getCartItems = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [rows] = await db.execute('SELECT c.id, p.name, p.description, p.price, c.quantity, p.image_url FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?', [user_id]);
        res.status(200).json(rows);
    } catch (error) {
    }
};

// Update item quantity in the cart
export const updateCartItemQuantity = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { quantity } = req.body;

        const [result] = await db.execute('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item quantity updated' });
    } catch (error) {
    }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute('DELETE FROM cart_items WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
    }
};

