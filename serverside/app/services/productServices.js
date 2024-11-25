import { query } from "../../config/queries.js";
import { CustomError } from '../../utils/customErrorHandler.js'

export const createProductService = async (data, imageUrl) => {
    try {
        // Validate and parse price
        const price = parseFloat(data.price);
        if (isNaN(price)) {
            throw new Error("Invalid price value");
        }

        // SQL query for inserting a product
        const sql = "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?);";

        // Execute query
        return await query(sql, [data.name, data.description, price, imageUrl]);
    } catch (error) {
        console.error("Error saving product to the database:", error.message);
        throw error; // Re-throw the error for proper error handling upstream
    }
};


export const getProductDetailsById = async (id) => {
    try {
        const sql = "SELECT * FROM products WHERE id = ?;";
        const rows = await query(sql, [id]);

        if (rows.length === 0) {
            throw new CustomError("Product not found", 404);
        }

        return rows[0];
    } catch (error) {
        console.error("Error fetching product details:", error.message);
        throw error;
    }
}

