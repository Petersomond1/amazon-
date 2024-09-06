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
       {path: "AdminProductsSelector",
        element: <AdminProductsSelector/>,
       } 
      ]
    },

    {
      path: "/",
      element: <ProductLayout/>,
      children: [
       {path: "all-products",
        element: <AllProducts/>,
       } 
      ]
    },

  ]);

  export default router;