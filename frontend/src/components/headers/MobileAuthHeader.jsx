import { Link, useNavigate } from "react-router-dom";
import { FaStaylinked } from "react-icons/fa6";
import { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsEyeFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { tabHandler } from "../../store/slice/tabSlice";
import { logout } from "../../store/slice/authSlice";
import { removeProfileInfo } from "../../store/slice/profileSlice";
import { resetAllLinks } from "../../store/slice/linkSlice";
import {
  getFromLocalStorage,
  clearFromLocalStorage,
} from "../../utlis/localStorage";

export default function MobileAuthHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getFromLocalStorage("user");
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tab);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    clearFromLocalStorage("user");
    dispatch(logout());
    dispatch(tabHandler({ tabName: "" }));
    dispatch(removeProfileInfo());
    dispatch(resetAllLinks());
    navigate("/auth/login");
  };

  const linkTabHandler = () => {
    dispatch(tabHandler({ tabName: "link" }));
  };

  const profileTabHandler = () => {
    dispatch(tabHandler({ tabName: "profile" }));
  };

  return (
    <nav className="p-4">
      <div className="bg-white flex items-center justify-between rounded-lg p-4">
        <Link to="/" className="flex items-center gap-1">
          <FaStaylinked size="20px" color="#2D68FF" />
          <div className="font-semibold text-[#505050] text-xl">devLinks</div>
        </Link>
        {!user?.data?._id && (
          <div onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </div>
        )}
        {user?.data?._id && (
          <>
            <ul className="flex items-center gap-4">
              <li
                onClick={linkTabHandler}
                className={`${
                  tabs.activeTab === "link" && "bg-[#EFECFE] text-[#633BFB]"
                } flex items-center gap-2 px-[2vh] py-[1vh] rounded-lg cursor-pointer transition-all hover:text-black`}>
                <HiOutlineExternalLink />
              </li>
              <li
                onClick={profileTabHandler}
                className={`${
                  tabs.activeTab === "profile" && "bg-[#EFECFE] text-[#633BFB]"
                } flex items-center gap-2 px-[2vh] py-[1vh] rounded-lg cursor-pointer transition-all hover:text-black`}>
                <CgProfile />
              </li>
            </ul>
            <Link
              to={`${window.location.origin}/link/${user?.data?._id}`}
              className="bg-[#EFECFE] px-[2vh] py-[1vh] font-semibold rounded-lg text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black">
              <BsEyeFill />
            </Link>
          </>
        )}
      </div>

      {!user?.data?._id && (
        <div className={`${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col gap-1 bg-white my-4 text-center p-4 rounded-lg">
            <li>
              <Link
                to="/auth/register"
                className="text-[#505050] tracking-tight transition-all hover:#2D68FF hover:opacity-80">
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/auth/login"
                className="text-[#505050] tracking-tight transition-all hover:#2D68FF hover:opacity-80">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
      {user?.data?._id && (
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-2 w-full bg-[#EFECFE] py-[1vh] rounded-lg text-[#633BFB] border border-transparent cursor-pointer transition-all hover:text-black hover:border hover:border-black">
            <IoMdLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
