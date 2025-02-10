import { useQuery } from "react-query";
import api from "./apiConfig"; // Assuming your base API configuration is in `api.js`

// Fetch Category Sales
const fetchCategorySales = async (filter) => {
  const { data } = await api.get(`/analytics/category?filter=${filter}`);
  return data;
};

export const useCategorySales = (filter) => {
  return useQuery({
    queryKey: ["categorySales", filter],
    queryFn: () => fetchCategorySales(filter),
  });
};

// Fetch Product Sales
const fetchProductSales = async (filter) => {
  const { data } = await api.get(`/analytics/products?filter=${filter}`);
  return data;
};

export const useProductSales = (filter) => {
  return useQuery({
    queryKey: ["productSales", filter],
    queryFn: () => fetchProductSales(filter),
  });
};

// Fetch Top Products
const fetchTopProducts = async (filter) => {
  const { data } = await api.get(`/analytics/top-products?filter=${filter}`);
  return data;
};

export const useTopProducts = (filter) => {
  return useQuery({
    queryKey: ["topProducts", filter],
    queryFn: () => fetchTopProducts(filter),
  });
};

const fetchGrowthRate = async (filter) => {
  const { data } = await api.get(`/analytics/category-growth?filter=${filter}`);
  return data;
};

export const useGetGrowth = (filter) =>{
  return useQuery({
    queryKey:["getGroathRate"],
    queryFn:()=> fetchGrowthRate(filter)
  })
}