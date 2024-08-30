// import api from './apiConfig.js';




export async function fetchIdsofProducts() {
    try {
       const response = await axios.get('http://localhost:3000/api/get-featured-ids');
      
    } catch (error) {
        console.error("Error fetching IDs and products:", error);
        throw error;
    }
}