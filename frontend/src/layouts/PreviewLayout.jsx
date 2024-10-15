import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewHeader from "../components/headers/PreviewHeader";

export default function PreviewLayout() {
  return (
    <main className="bg-white min-h-screen">
      <div className="sm:bg-[#623BFE] p-4 sm:p-8 min-h-[40vh] rounded-b-3xl">
        <PreviewHeader />
      </div>
      <Outlet />
      <ToastContainer />
    </main>
  );
}
