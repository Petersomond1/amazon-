import api from './apiConfig.js'

//we create the web page , we gave it a route as a child of the default layout and this is in order
//to inherit the navbar and sidebar and footer , after this we call the service that will fetch the
//data or submit it , in the service we handle the logic that will send or get the data
//now we go to the server side where we search for that endpoint that will trigger a function
//we go a nd create the function/controller and then after completing the backend setup , we
export async function fetchIdsofProducts() {
    try {
        const response = await api.get('/admin/get-featured-ids');
        const idsArray = response.data;
        console.log("here is the ids ", idsArray)
        // Iterate over the idsArray and conditionally fetch data
        const requests = idsArray.map((item, index) => {

            if (index === 1) {
                // Second row: fetch categories
                return getCategories(item.row_ids);
            } else {
                // Other rows: fetch products
                return getProducts(item.row_ids);
            }
        });

        const responses = await Promise.all(requests);
        console.log("here is the final response ", responses)


        return responses;

    } catch (error) {
        console.error("Error fetching IDs and products:", error);
        throw error;
    }
}

// Function to fetch products by IDs
const getProducts = async(ids) => {
    try {
        const response = await api.get(`/client/home-products?ids=${ids}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products by ids:", error);
        throw error;
    }
}

// Function to fetch categories by IDs
const getCategories = async(ids) => {
    try {
        const response = await api.get(`/client/home-categories?ids=${ids}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories by ids:", error);
        throw error;
    }
}
