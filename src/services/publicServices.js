import api from "./apiConfig"

export const getSearchResult = async (query) =>{
    const response = await api.post(`/product/search?q=${query}`)
    return response.data.data
}

export const getAllProducts = async () =>{
    const response = await api.get(`/product`)
    return response.data
}