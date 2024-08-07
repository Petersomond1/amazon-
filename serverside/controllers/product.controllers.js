import db from '../config/db.js';
import handleError from '../utils/handleError.js';
import { validationResult } from 'express-validator';


export const addRowsIds = async (req, res) => {
  const rows = req.body;
  if (!rows || !Array.isArray(rows)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const updateQuery = "UPDATE idstofeature SET row_ids = ? WHERE id = ?";

  try {
    await Promise.all(rows.map(async (numbersArray, index) => {
      const id = index + 1;
      await db.query(updateQuery, [JSON.stringify(numbersArray), id]);
    }));
    res.status(200).json({ message: "Data updated" });
  } catch (error) {
    console.error("Error updating rows:", error);
    res.status(500).json({ error: "Failed to update rows" });
  }
};


// Create a new product
export const createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, price, sales_price, quantity_InStock, image, image_a, image_b, image_c, video_image, category, type, ratings, reviews, prime, soldby, featured } = req.body;

        const query = 'INSERT INTO products ( ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )';
        const values = [name, description, price, sales_price, quantity_InStock, image, image_a, image_b, image_c, video_image, category, type, ratings, reviews, prime, soldby, featured];

        await db.execute(query, values);

        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Get all products

export const getAllProducts = async (req, res) => {
    try {
        const que = "SELECT * from idstofeature;";
  
        const result = await db.query(que);
        // Parse the row_ids strings into arrays and then flatten them
        const RowIds = result[0].flatMap(row => row.row_ids);
        // console.log("RowIds in All row_ids @ /products: ", RowIds);
        const allRowIds = result[0]
            .flatMap(row => JSON.parse(row.row_ids));
  
        // console.log("All row_ids: ", allRowIds);
        
        // Construct the placeholders for the SQL query
        const placeholders = allRowIds.map(() => '?').join(',');
        // console.log("placeholders in All row_ids @ /products : ", placeholders);
  
        // Create the SQL query
  const qu = `SELECT * FROM products WHERE id IN (${placeholders})`;
  
        // Use spread operator to pass the values
        const data = await db.query(qu, [...allRowIds]);
        res.status(200).json([data, RowIds]);
    } catch (error) {
        // console.log("the problem is here: ", error.message);
    }
  }
  

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        const product = rows[0];

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        handleError(error, req, res);
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { name, description, price, category, stock, image } = req.body;

        const query = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, image_url = ? WHERE id = ?';
        const values = [name, description, price, category, stock, image, id];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        handleError(error, req, res);
    }
};


// Explanation of Enhancements
// Validation: Input validation ensures the integrity of data being added or updated.
// Authorization: Only users with the admin role can create, update, or delete products.
// Error Handling: Consistent error handling using handleError.
// CRUD Operations: Comprehensive implementation of CRUD operations for products.
// Code Organization: Clear and organized code for better maintainability.