import { query } from "../../config/queries.js";

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
