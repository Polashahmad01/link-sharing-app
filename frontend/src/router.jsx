import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <h1>Main App Page</h1>,
    errorElement: <p>Error from Main App Page</p>,
    children: []
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <p>Error from Auth</p>,
    children: [
      {
        path: "/auth/register",
        element: <RegisterPage />
      },
      {
        path: "/auth/login",
        element: <LoginPage />
      }
    ]
  },
  {
    path: "*",
    element: <h1>Main Error Page 404</h1>
  }
]);

export default router;
