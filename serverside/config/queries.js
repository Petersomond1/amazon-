import pool from './db.js';

export const query = async (sql, values)=>{
    const [result] = await pool.execute(sql, values);
    return result;
}