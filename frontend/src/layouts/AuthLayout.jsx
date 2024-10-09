import { Outlet } from "react-router-dom";
import MainHeader from "../components/headers/MainHeader";

export default function AuthLayout() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <MainHeader />
      <Outlet />
    </main>
  );
}
