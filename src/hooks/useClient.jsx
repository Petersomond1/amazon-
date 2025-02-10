import { useQuery } from "react-query";
import { getAllProducts, getSearchResult } from "../services/publicServices";
import { getClientOrders } from "../services/clientService.js";

export const useGetOrders = (userId)=>{
    return useQuery({
        queryKey:['getClientOrders'],
        queryFn:()=>getClientOrders(userId)
    })
}
