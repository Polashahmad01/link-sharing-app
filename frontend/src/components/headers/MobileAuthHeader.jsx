import { Link, useNavigate } from "react-router-dom";
import { FaStaylinked } from "react-icons/fa6";
import { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsEyeFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import {
  getFromLocalStorage,
  clearFromLocalStorage,
} from "../../utlis/localStorage";

export default function MobileAuthHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getFromLocalStorage("user");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    clearFromLocalStorage("user");
    navigate("/auth/login");
  };

  return (
    <nav className="p-4">
      <div className="bg-white flex items-center justify-between rounded-md p-4">
        <Link to="/app" className="flex items-center gap-1">
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
              <li className="flex items-center gap-2 bg-[#EFECFE] px-[2vh] py-[1vh] rounded-md text-[#633BFB] cursor-pointer transition-all hover:text-black">
                <HiOutlineExternalLink />
              </li>
              <li className="flex items-center gap-2 bg-[#EFECFE] px-[2vh] py-[1vh] rounded-md text-[#633BFB] cursor-pointer transition-all hover:text-black">
                <CgProfile />
              </li>
            </ul>
            <div className="bg-[#EFECFE] px-[2vh] py-[1vh] font-semibold rounded-md text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black">
              <BsEyeFill />
            </div>
          </>
        )}
      </div>

      {!user?.data?._id && (
        <div className={`${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col gap-1 bg-white my-4 text-center p-4 rounded-md">
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
            className="flex items-center justify-center gap-2 w-full bg-[#EFECFE] py-[1vh] rounded-md text-[#633BFB] border border-transparent cursor-pointer transition-all hover:text-black hover:border hover:border-black">
            <IoMdLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
