import api from "./apiConfig"

export const getClientOrders = async () =>{
    try {
        console.log("go here")
        const response = await api.get(`/client/getClientOrders`)
        return response.data;
    } catch (error) {
        console.error("something wrong happented")
    }
}