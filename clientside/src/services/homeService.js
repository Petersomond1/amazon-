import api from './apiConfig.js'

//we create the web page , we gave it a route as a child of the default layout and this is in order
//to inherit the navbar and sidebar and footer , after this we call the service that will fetch the
//data or submit it , in the service we handle the logic that will send or get the data
//now we go to the server side where we search for that endpoint that will trigger a function
//we go a nd create the function/controller and then after completing the backend setup , we
//go back o the frontend to handle the data/response coming from the server 
export async function fetchIdsofProducts() {
    try {
       const response = await api.get('/admin/get-featured-ids');
       return response.data
      
    } catch (error) {
        console.error("Error fetching IDs and products:", error);
        throw error;
    }
}