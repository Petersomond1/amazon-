
import { getAllUsersService, getFeaturedIdsService, updateProductsIdsInHomePage } from '../services/adminServices.js';
import CustomError from '../utils/handleError.js';

// Select productsid to feature
export const selectProductsid = async (req, res, next) => {
   try {
    await updateProductsIdsInHomePage(req.body);
    res.status(200).json({message: "Products ids selected successfully"});
   } catch (error) {
    next(error)
   }
};


// Get featured ids
export const GetFeaturedIds = async(req, res) => {
    try{
        const data = await getFeaturedIdsService();
        res.status(200).json(data);
    }catch (error){
        next(error)
    }

}

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const rows = await getAllUsersService();
        res.status(200).json(rows);
    } catch (error) {
        handleError(error, req, res);
    }
};