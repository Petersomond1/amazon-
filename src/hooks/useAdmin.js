import { useQuery } from "react-query"
import { getOrdersForAdmin } from "../services/adminService"

export const useGetOrders = () =>{
    return useQuery({
        queryKey:['getOrders'],
        queryFn:getOrdersForAdmin
    })
}