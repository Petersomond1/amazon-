import { useQuery } from "react-query";
import { getAllProducts, getSearchResult } from "../services/publicServices";

export const useGetSearchResutl = (searchQuery)=>{
    return useQuery({
        queryKey:['getSearchResult'],
        queryFn:()=>getSearchResult(searchQuery)
    })
}

export const useGetAllProducts = ()=>{
    return useQuery({
        queryKey:['gtAllProducts'],
        queryFn:getAllProducts,
    })
}