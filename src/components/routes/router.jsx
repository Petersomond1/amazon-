import { 
  createBrowserRouter,
} from "react-router-dom";
import DefaultLayout from "../../views/layouts/DefaultLayout.jsx";
import AdminProductsSelector from "../../views/adminViews/AdminAnalytics.jsx";
import DashLayout from "../../views/layouts/DashLayout.jsx";
import Home from "../../views/Home.jsx";
import AllProducts from "../../views/AllProducts.jsx";
//import ProductLayout from "../../views/layouts/ProductLayout";
import AdminDashboardProducts from "../../views/adminViews/AdminDashboardProducts.jsx"
import AdminAnalytics from "../../views/adminViews/AdminAnalytics.jsx";
import AdminDashboardOrders from "../../views/adminViews/AdminDashboardOrders.jsx";
import AdminDashboardUsers from "../../views/adminViews/AdminDashboardUsers.jsx";
import AdminDashboardShipping from "../../views/adminViews/AdminDashboardShipping.jsx";
import AdminDashboardCalendar from "../../views/adminViews/AdminDashboardCalendar.jsx";
import AdminDashboardInbox from "../../views/adminViews/AdminDashboardInbox.jsx";
import Register from "../../views/Register.jsx";
import Login from "../../views/Login.jsx";
import ProductDetail from "../../views/defaultviews/ProductDetail.jsx";
import CategoryProducts from "../../views/defaultviews/CategoryProducts.jsx"
import Cart from "../../views/Payment/Cart.jsx"
import OrderHistory from "../../views/Orders.jsx"
import Settings from "../../views/Settings.jsx"
import ShippingView from "../../views/ShippingView.jsx";
import PrivateRoute from "../../app/PrivateRoute.jsx"
import Checkout from "../../views/Checkout.jsx";
import { Elements } from "@stripe/react-stripe-js";
import ErrorPage from "../../views/Payment/ErrorPage.jsx";
import SuccessPage from "../../views/Payment/SuccessPage.jsx";
import SalesDashboard from "../../views/adminViews/AdminDashboardSales.jsx";
import ControlProducts from "../../views/adminViews/ControlProducts.jsx";
import AdminLogin from "../../views/adminViews/AdminSignIn";
// import AdminRoutes from "../../app/adminRoutes.js";
import SearchResults from "../../views/SearchResults.jsx";


const router = createBrowserRouter([

  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "admin-login", element: <AdminLogin /> },


  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {index: true, element: <Home/>},
      { path: "search?", element: <SearchResults /> },
      { path: "all-products", element: <AllProducts /> },
      { path: "category/:name", element: <CategoryProducts /> },
      { path: "product/:id/:name", element: <ProductDetail /> }, 
      { path: "cart", element: <Cart /> },
      { path: "orders", element: <OrderHistory /> },
      { path: "setting", element: <Settings /> },
      { path: "success", element: <SuccessPage /> },
      { path: "cancel", element: <ErrorPage /> },
      { path: "shipping", element: ( 
          <PrivateRoute>
            <ShippingView />
          </PrivateRoute>
        ) },
       // {
       //   path: "checkout",
       //   element: (
       //     <PrivateRoute>
       //       <Elements stripe={stripePromise}>
       //         <Checkout />
       //       </Elements>
       //     </PrivateRoute>
       //   ),
       // },  
      ]
  },

{
  path: "/admin-dashboard",
  element: (
    // <AdminRoutes allowedRoles={['admin']}>
      <DashLayout />
    // </AdminRoutes>
  ),
  children: [
    { index: true, element: <AdminAnalytics /> },
    { path: "control", element: <ControlProducts /> },
    { path: "products", element: <AdminDashboardProducts /> },
    { path: "sales", element: <SalesDashboard /> },
    // { path: "orders", element: <AdminDashboardOrders /> },
    { path: "users", element: <AdminDashboardUsers /> },
    { path: "shipping", element: <AdminDashboardShipping /> },
    { path: "calendar", element: <AdminDashboardCalendar /> },
    { path: "admininbox", element: <AdminDashboardInbox /> },
  ],
}



  ]);

  export default router;