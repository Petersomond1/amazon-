import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Set a reasonable limit
  queueLimit: 0, // Unlimited queued requests
});

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection successful!");
        connection.release(); // Release connection back to the pool
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the app if DB connection fails
    }
})();

export default pool;
