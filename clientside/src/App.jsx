import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbarup from "./navbar/Navbarup";
import AppLayout from "./AppLayout";
import Navbardown from "./navbar/Navbardown";
import Footer from "./navbar/Footer";
import ProductsAndServices_Display_Row_1_Carousel_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_1_Carousel_Listing";
//import ProductsAndServices_Display_Row_2_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_2_Listing";
//import ProductsAndServices_Display_Row_3_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_3_Listing";
//import ProductsAndServices_Display_Row_4_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_4_Listing";
//import ProductsAndServices_Display_Row_5_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_5_Listing";
//import ProductsAndServices_Display_Row_6_Listing from "./ProductsAndServices/ProductsAndServices_Display_Row_6_Listing";
import PrivateRoute from "./PrivateRoute";
import ProductsAndServices_Display from "./ProductsAndServices/ProductsAndServices_Display";
//import AllProductsAndServices_Display from "./ProductsAndServices/AllProductsAndServices_Display";
//import Cart from "./ProductsAndServices/Cart";
//import { CartProvider } from "./ProductsAndServices/CartContext.jsx";
//import CheckoutToShipping from "./ProductsAndServices/CheckoutToShipping";
//import Payment from "./ProductsAndServices/Payment.jsx";
import AdminDashboard from "./Admindashboard/AdminDashboard";
import ProductsAndServices_SingleDisplay from "./ProductsAndServices/ProductsAndServices_SingleDisplay";
import ProductsAndServices_CategoryDisplay from "./ProductsAndServices/ProductsAndServices_CategoryDisplay";
import Login from "./Login.jsx";
import Register from "./Register.jsx"; // Make sure you have these components
import StatusMessage from "./StatusMessage";  // Import the status message component
import axios from 'axios';

const queryClient = new QueryClient();


const RedirectToDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const checkRole = async () => {
          try {
              const response = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
              if (response.data.role === 'admin') {
                  navigate('/admindashboard');
              }
          } catch (error) {
              console.error('Error checking role:', error);
          }
      };

      checkRole();
  }, [navigate]);

  return null;
};

function App() {
  return (
    //<CartProvider>
     <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbarup />
          <Navbardown />
          <StatusMessage /> 
          <Routes>
          <Route element={<AppLayout />}></Route>
        <Route path="/" element={<ProductsAndServices_Display />}></Route>
        <Route path="/admindashboard" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
           <Route path="/ProductsAndServices_Display_Row_1_Carousel_Listing" element={<ProductsAndServices_Display_Row_1_Carousel_Listing />}></Route>
            {/* <Route path="/ProductsAndServices_Display_Row_2_Listing/:category" element={<ProductsAndServices_Display_Row_2_Listing />}></Route> */}
            {/* <Route path="/ProductsAndServices_Display_Row_3_Listing" element={<ProductsAndServices_Display_Row_3_Listing />}></Route> */}
            {/* <Route path="/ProductsAndServices_Display_Row_4_Listing" element={<ProductsAndServices_Display_Row_4_Listing />}></Route> */}
            {/* <Route path="/ProductsAndServices_Display_Row_5_Listing" element={<ProductsAndServices_Display_Row_5_Listing />}></Route> */}
            {/* <Route path="/ProductsAndServices_Display_Row_6_Listing" element={<ProductsAndServices_Display_Row_6_Listing />}></Route> */}
            <Route path="/ProductsAndServices_SingleDisplay/:id" element={<ProductsAndServices_SingleDisplay />}></Route> 
          <Route path="/ProductsAndServices_CategoryDisplay/:category" element={<ProductsAndServices_CategoryDisplay />}></Route> 
            {/* <Route path="/api/cart" element={<Cart />}></Route> */}
            {/* <Route path="/api/checkouttoshipping" element={<CheckoutToShipping />}></Route> */}
            {/* <Route path="/api/payment" element={<Payment />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/redirect" element={<RedirectToDashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
   // </CartProvider>
  );
}

export default App;




