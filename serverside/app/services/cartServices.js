import { query } from '../../config/queries.js';
import { CustomError } from '../../utils/customErrorHandler.js';

export const addItemToCartService = async (products, user_id) => {
    try {
        console.log("Here are the products:",products);

        // Map each product to a promise for inserting into the database
        const promises = products.map(product => {
            const sqlQuery = `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`;
            return query(sqlQuery, [user_id, product.id, product.quantity]);
        });

        // Execute all promises in parallel and wait for their resolution
        await Promise.all(promises);

        console.log("All products added to the cart.");
        return { message: "Items added to cart successfully." };
    } catch (error) {
        console.error("Error while adding items to cart:", error);
        throw new CustomError("Failed to add items to cart", 500, error);
    }
};
