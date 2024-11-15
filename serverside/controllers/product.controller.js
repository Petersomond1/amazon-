import pool from "../config/db.js"
import { createProductService } from "../services/productServices.js"

export const fetchAllProducts = async (req,res, next) =>{
    try {
        const allProducts = await pool.execute("SELECT p.*, c.name AS category_name FROM products p JOIN category c ON p.category_id = c.id",[])
        res.status(200).json(allProducts[0])      
    } catch (error) {
        next(error)
    }
}

export const fetchAllProductsByCategories = async (req, res, next) =>{
    const {name} = req.params
try {
    const categoryId = "SELECT * FROM category WHERE name = ? " 
    const result1 = await pool.query(categoryId, [name])

    const id = result1[0][0].id
    const q = "SELECT * FROM products WHERE category_id = ?"
    const result2 = await pool.query(q, [id])
    res.status(200).json(result2[0])
} catch (error) {
    next(error)                     
}
}

export const createNewProduct = async (req,res,next) =>{
    console.log("request after uplaod ", req.body)
    try {
        const newProduct = await createProductService(req.body)
    } catch (error) {
        next(error)
    }
}