import { Link } from "react-router-dom";
import { FaStaylinked } from "react-icons/fa6";
import { useState } from "react";

export default function MobileAuthHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4">
      <div className="bg-white flex items-center justify-between rounded-md p-4">
        <Link to="#" className="flex items-center gap-1">
          <FaStaylinked size="20px" color="#2D68FF" />
          <div className="font-semibold text-[#505050] text-xl">devLinks</div>
        </Link>
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
      </div>

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
    </nav>
  );
}
