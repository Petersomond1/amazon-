import db from '../config/db.js';
import handleError from '../utils/handleError.js';
import { validationResult } from 'express-validator';


// Create an order
export const createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user_id = req.user.id;
        
        // Fetch cart items for the user
        const [cartItems] = await db.execute('SELECT c.product_id, c.quantity, p.price FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?', 
            [user_id]);
        
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'No items in cart' });
        }

        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Insert a new order
        const [orderResult] = await db.execute('INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_status) VALUES (?, ?, ?, ?, ?)', 
            [user_id, totalAmount, 'pending', req.body.shipping_address, 'pending']);
        const orderId = orderResult.insertId;

        // Insert cart items into order_items
        const orderItems = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);
        await db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?', [orderItems]);

        // Clear the cart
        await db.execute('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

        // Fetch the created order
        const [order] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);

        res.status(201).json(order[0]);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Get all orders for a user
export const getAllOrdersForUser = async (req, res) => {
    try {
        const user_id = req.user.id;
        const [orders] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [user_id]);

        res.status(200).json(orders);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const [orders] = await db.execute('SELECT * FROM orders WHERE id = ? AND user_id = ?', [id, req.user.id]);

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(orders[0]);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { quantity, total_price, status } = req.body;

        const query = 'UPDATE orders SET quantity = ?, total_price = ?, status = ? WHERE id = ? AND user_id = ?';
        const values = [quantity, total_price, status, id, req.user.id];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found or not authorized' });
        }

        const [updatedOrder] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);

        res.status(200).json(updatedOrder[0]);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute('DELETE FROM orders WHERE id = ? AND user_id = ?', [id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found or not authorized' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};


// duplication routes below to be removed or resolved later


// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM orders');
        res.status(200).json(rows);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { status } = req.body;

        const query = 'UPDATE orders SET status = ? WHERE id = ?';
        const values = [status, id];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Delete an order
// export const deleteOrder = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const [result] = await db.execute('DELETE FROM orders WHERE id = ?', [id]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         handleError(error, req, res);
//     }
// };
