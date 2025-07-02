import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AccessibilityProvider from "@/context/accessibility-context";
import ProtectedRoute from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";
import { FilesProvider } from "@/context/files-context";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AccessibilityProvider>
          <FilesProvider>
            <MainLayout />
          </FilesProvider>
        </AccessibilityProvider>
      </ProtectedRoute>
    ),
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    element: (
      <AuthRoutes>
        <AuthLayout />
      </AuthRoutes>
    ),
    children: [
      { path: "/giris", element: <LoginPage /> },
      { path: "/kayit", element: <RegisterPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
