import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile"; 
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { WalletDetail } from "./pages/WalletDetail";
import { WalletMonthlyDetail } from "./pages/WalletMonthlyDetail";
import { MainLayout } from "./layouts/MainLayout";
import { InvestmentPage } from "./pages/InvestmentPage";
import './App.css';
import { DebtsPage } from "./pages/DebtsPage";

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
            path: "/wallets/:id", 
            element: <WalletDetail />,
          },
          {
            path: "/wallets/:id/month/:year/:month",
            element: <WalletMonthlyDetail />,
          },
          {
            path: "/investments",
            element: <InvestmentPage />,
          },
          {
            path: "/profile", 
            element: <Profile />,
          },
          {
            path: "/debts",
            element: <DebtsPage />,
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