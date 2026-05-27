import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing"; 
import { ProtectedRoute } from "./components/ProtectedRoute";

import './App.css';

const HomeGuard = () => {
  const skipLanding = localStorage.getItem("skipLanding") === "true";
  
  if (skipLanding) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/welcome" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeGuard />, 
  },
  {
    path: "/welcome",
    element: <Landing />,
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
        path: "/dashboard",
        element: <Dashboard />,
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