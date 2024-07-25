// db.js
import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'amazon_ecommerce_mysqldb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("db connected");
    connection.release();
  } catch (err) {
    console.error("db did not connect", err);
  }
})();

export default pool;
