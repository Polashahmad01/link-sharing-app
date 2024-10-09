import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ErrorPage from "./views/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
