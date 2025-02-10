import data from "../views/adminViews/makeOrdersData"
import api from "./apiConfig"

export const getOrdersForAdmin = async ()=>{
    const response = await api.get('/order/all-orders')
    console.log("it went here", response)
    return response.data;
}