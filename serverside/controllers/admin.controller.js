import db from '../config/db.js';
// import handleError from '../utils/handleError.js';
// import { validationResult } from 'express-validator';

// Select productsid to feature
export const selectProductsid = async (req, res) => {
    try {
        // const [rows] = await db.execute('SELECT * FROM idstofeature');
        console.log(req.body)
        res.status(200).json(rows);
    } catch (error) {
        handleError(error, req, res);
    }
};