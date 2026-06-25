import { createBrowserRouter } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Payment from "../pages/Payment";
import Queue from "../pages/Queue";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import AdminServices from "../pages/AdminServices";
import AdminBookings from "../pages/AdminBookings";
import AdminPayments from "../pages/AdminPayments";

// Layout
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/AdminLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/booking",
    element: <Booking />,
  },

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "services",
        element: <AdminServices />,
      },

      {
        path: "bookings",
        element: <AdminBookings />,
      },

      {
        path: "payments",
        element: <AdminPayments />,
      },
    ],
  },
]);
