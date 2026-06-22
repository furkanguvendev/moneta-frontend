import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile"; 
import { ProtectedRoute } from "./components/ProtectedRoute";
import './App.css';
import { Transactions } from "./pages/Transactions";
import { Wallets } from "./pages/Wallets";
import { MainLayout } from "./layouts/MainLayout";

const LandingGuard = () => {
  const skipLanding = localStorage.getItem("skipLanding") === "true";
  
  if (skipLanding) {
    return <Navigate to="/login" replace />;
  }
  return <Landing />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingGuard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
  element: <ProtectedRoute />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/transactions", 
          element: <Transactions />,
        },
        {
          path: "/wallets", 
          element: <Wallets />,
        },
        {
          path: "/profile", 
          element: <Profile />,
        },
      ],
    },
  ],
},
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}