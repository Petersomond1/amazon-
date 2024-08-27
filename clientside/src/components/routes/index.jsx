// import * as React from "react";
import { createRoot } from "react-dom/client";
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
//   Link,
} from "react-router-dom";
import DefaultLayout from "../../views/layouts/DefaultLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout/>
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  export default router;