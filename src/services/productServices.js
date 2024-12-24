// src/services/productService.js
import api from './apiConfig';
import { useMutation, useQuery } from 'react-query';



// Custom hook to manage fetching products with caching and refetching
export const useFetchProducts = () => {

    // Fetch all products
    const fetchProducts = async () => {
        const response = await api.get('/product');
        return response.data;
    };
    
    return useQuery(['products'], fetchProducts, {
        // Consider data fresh for 5 minutes (300,000 milliseconds)
        staleTime: 300000,

        // Keep the data in the cache for 10 minutes (600,000 milliseconds) after it becomes stale
        cacheTime: 600000,

        // Automatically refetch data in the background on mount if stale
        refetchOnMount: 'always',  // Or 'always', 'true', or 'false'
        
        // Refetch data in the background every 5 minutes (like before)
        refetchInterval: 300000,

        // This option ensures the query doesn't block UI rendering while fetching
        refetchOnWindowFocus: true,

        // Callbacks
        onSuccess: () => console.log('Products fetched successfully.'),
        onError: (error) => console.error('Error fetching products:', error)
    });
};

// Custom hook for fetching product details with caching
export const useFetchProductDetails = (productId) => {

    // Function to fetch a single product detail
    const fetchProductDetails = async (productId) => {
        const response = await api.get(`/product/${productId}`);
        return response.data;
    };
    return useQuery(['productDetails', productId], () => fetchProductDetails(productId), {
        enabled: !!productId,  // Only fetch when productId is available
        onSuccess: () => console.log('Product details fetched successfully.'),
        onError: (error) => console.error('Error fetching product details:', error)
    });
};


export const useGetCategoryProducts = (name)=> {

// fetch the products and the various categories
const fetchCategories = async (name) => {
   const response = await api.get(`/product/categories/${name}`);
   return response.data;
}

return useQuery(['productsCategories', name],()=> fetchCategories(name), {
    onSuccess: ()=> console.log('productsCategories fetched succesfully.'),
    onError: (error)=> console.log('error fecthing productsCategories:', error)
});
};

// lines 60 and line 63   why two return??


export const getCategoryProducts = async (category) =>{
    try {
        const result = await api.get(`/product/category/${category}`)
        return result.data
    } catch (error) {
        console.log("an issue happened while geting categorie data ", error)
    }
}

export const getAllProducts = async () =>{
    try {
        const result = await api.get(`/product`)
        return result.data
    } catch (error) {
        console.log("error in getting all data", error)
        return error
    }
}

//custom hook to create new products
export function useCreateProduct(onSuccess,onError){
    const createProduct = async (data)=>{
        try {
            const result = await api.post(`/product/create`, data,
                {
                    headers:{
                        'COntent-Type': 'multipart/formData',
                    }
                }
            );
        } catch (error) {
            throw new Error
        }
    }

return useMutation((data) => createProduct(data),{
    onSuccess,
    onError,
})
}