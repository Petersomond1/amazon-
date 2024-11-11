// import * as React from "react";
import { createRoot } from "react-dom/client";
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
//   Link,
} from "react-router-dom";
import DefaultLayout from "../../views/layouts/DefaultLayout";
import AdminProductsSelector from "../../views/adminViews/AdminProductsSelector";
import DashLayout from "../../views/layouts/DashLayout";
import Home from "../../views/Home";
import AllProducts from "../../views/AllProducts";
import ProductLayout from "../../views/layouts/ProductLayout";
import ProductsCategories from "../../views/ProductsCategories";
import AdminDashboardProducts from "../../views/adminViews/AdminDashboardProducts"
import AdminDashboardSales from "../../views/adminViews/AdminDashboardSales";
import AdminDashboardOrders from "../../views/adminViews/AdminDashboardOrders";
import AdminDashboardUsers from "../../views/adminViews/AdminDashboardUsers";
import AdminDashboardShipping from "../../views/adminViews/AdminDashboardShipping";
import AdminDashboardCalendar from "../../views/adminViews/AdminDashboardCalendar";
import AdminDashboardInbox from "../../views/adminViews/AdminDashboardInbox";
import Register from "../../views/Register";
import Login from "../../views/LOgin";
import ProductDetail from "../../views/defaultviews/ProductDetail";
import Products from "../../views/defaultviews/Products"
import Cart from "../../views/Cart"
import Orders from "../../views/Orders"
import Profile from "../../views/Profile"
import ShippingView from "../../views/ShippingView";
import PrivateRoute from "../../app/PrivateRoute.jsx"
import Checkout from "../../views/Checkout.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../services/stripe.js";



const router = createBrowserRouter([

  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },

  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {index: true, element: <Home/>},
      { path: "all-products", element: <AllProducts /> },
      { path: "category/:name", element: <Products /> }, //missing sidebar design
      { path: "product/:name", element: <ProductDetail /> }, 
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Orders /> },
      { path: "profile", element: <Profile /> },
      { path: "shipping", element: ( 
          <PrivateRoute>
            <ShippingView />
          </PrivateRoute>
        ) },
        {
          path: "checkout",
          element: (
            <PrivateRoute>
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </PrivateRoute>
          ),
        },  
      ]
  },

    {
      path: "/AdminDashboard",
      element: <DashLayout/>,
      children: [
       {index : true, element: <AdminProductsSelector/>}, 
       { path: "products", element: <AdminDashboardProducts /> },
       { path: "sales", element: <AdminDashboardSales /> },
       { path: "orders", element: <AdminDashboardOrders /> },
       { path: "users", element: <AdminDashboardUsers />,
        //  errorElement:  <ErrorBoundary />
         },
       { path: "shipping", element: <AdminDashboardShipping /> },
       { path: "calender", element: <AdminDashboardCalendar /> },
       { path: "admininbox", element: <AdminDashboardInbox /> },

      ]
    },

    // {
    //   path: "/",
    //   element: <ProductLayout/>,
    //   children: [
    //   {index: true, element: <Home/>},
    //    {path: "all-products",
    //     element: <AllProducts/>,
    //    },

    //    {path: "category/:name",
    //     element: <ProductsCategories/>,
    //    } ,
      
       
    //   ]
    // },

    

  ]);

  export default router;