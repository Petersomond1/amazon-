import db from '../config/db.js';


// Get product by ID
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
      const [products] = await db.query('SELECT * FROM products');
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Search products
export const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const [products] = await db.query('SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Filter products by category
export const filterProducts = async (req, res) => {
  const { category } = req.query;
  try {
    const [products] = await db.query('SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = ?)', [category]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
