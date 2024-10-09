import { Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { getFromLocalStorage } from "../utlis/localStorage";

export default function ProtectedRoute() {
  const user = getFromLocalStorage("user");

  if (!user?.data?._id) {
    return <Navigate to="/auth/login" replace />;
  }
  return <AppLayout />;
}
