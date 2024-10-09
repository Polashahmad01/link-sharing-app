import { Link } from "react-router-dom";
import { FaStaylinked } from "react-icons/fa6";

export default function DeskTopAuthHeader() {
  return (
    <nav className="container mx-auto">
      <div className="py-8">
        <div className="bg-white flex items-center justify-between px-8 py-4 rounded-md">
          <Link to="#" className="flex items-center gap-1">
            <FaStaylinked size="25px" color="#2D68FF" />
            <div className="font-semibold text-[#505050] text-xl">devLinks</div>
          </Link>
          <div>
            <ul className="flex items-center gap-8">
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
        </div>
      </div>
    </nav>
  );
}
