import db from '../config/db.js';
// import handleError from '../utils/handleError.js';
// import { validationResult } from 'express-validator';

// Select productsid to feature
export const selectProductsid = async (req, res) => {
    const rows = req.body; // rows should be an array of arrays with {id} objects
    const updateQuery = "UPDATE idstofeature SET row_ids = ? WHERE id = ?";

    try {
        for (let i = 0; i < rows.length; i++) {
            const array = rows[i].map(item => item.id); // Extracting ids from each subarray
            const result = await db.query(updateQuery, [JSON.stringify(array), i + 1]);
        }
        res.status(200).json({ result: "worked!!!" });
    } catch (error) {
        // handleError(error, req, res);
        console.log(error)
    }
};

export const GetFeaturedIds = async(req, res) => {
    try{
        const result = await db.query('SELECT * FROM idstofeature'); 
        const data = result[0]
        res.status(200).json(data);
    }catch (error){
        console.log(error)
    }

}


// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        handleError(error, req, res);
    }
};