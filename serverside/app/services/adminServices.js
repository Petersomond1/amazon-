import query from '../../config/queries.js'
import { CustomError } from "../../utils/customErrorHandler"


export  async function updateProductsIdsInHomePage(data){
    try {
        const updateQuery = "UPDATE idstofeature SET row_ids = ? WHERE id = ?";
        for (let i = 0; i < rows.length; i++) {
            const array = rows[i].map(item => item.id); // Extracting ids from each subarray
            const result = await query(updateQuery, [JSON.stringify(array), i + 1]);
        }
        return "success";
    } catch (error) {
        throw new CustomError("Error updating products ids", 500, error)
    }
} 


export async function getFeaturedIdsService(){
    try {
        const [rows] = await query("SELECT * FROM idstofeature");
        return rows;
    } catch (error) {
        throw new CustomError("Error fetching featured ids", 500, error)
    }
}


export async function getAllUsersService(){
    try {
        const [rows] = await query("SELECT * FROM users");
        return rows;
    } catch (error) {
        throw new CustomError("Error fetching users", 500, error)
    }
}