import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../components/headers/MainHeader";

export default function AppLayout() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <MainHeader />
      <Outlet />
      <ToastContainer />
    </main>
  );
}
