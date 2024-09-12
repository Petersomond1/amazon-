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

const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout/>,
      children: [
        {path: "home",
         element: <Home/>,
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
       { path: "users", element: <AdminDashboardUsers />, errorElement:  <ErrorBoundary /> },
       { path: "shipping", element: <AdminDashboardShipping /> },
       { path: "calender", element: <AdminDashboardCalendar /> },
       { path: "admininbox", element: <AdminDashboardInbox /> },

      ]
    },

    {
      path: "/",
      element: <ProductLayout/>,
      children: [
       {path: "all-products",
        element: <AllProducts/>,
       },

       {path: "category/:name",
        element: <ProductsCategories/>,
       } ,
      
       
      ]
    },

    

  ]);

  export default router;