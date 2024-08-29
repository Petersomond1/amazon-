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

const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout/>
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
      path: "about",
      element: <div>About</div>,
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  export default router;