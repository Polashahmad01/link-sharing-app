import { Link } from "react-router-dom";
import { FaStaylinked } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { getFromLocalStorage } from "../../utlis/localStorage";

export default function DeskTopAuthHeader() {
  const user = getFromLocalStorage("user");

  return (
    <nav className="container mx-auto">
      <div className="py-8">
        <div className="bg-white flex items-center justify-between px-8 py-4 rounded-md">
          <Link to="/app" className="flex items-center gap-1">
            <FaStaylinked size="25px" color="#2D68FF" />
            <div className="font-semibold text-[#505050] text-xl">devLinks</div>
          </Link>

          {user?.data?._id && (
            <>
              <div className="">
                <ul className="flex items-center gap-16">
                  <li>
                    <div className="flex items-center gap-2 bg-[#EFECFE] px-[3vh] py-[1vh] rounded-md text-[#633BFB] cursor-pointer transition-all hover:text-black">
                      <HiOutlineExternalLink size="20px" />
                      <span className="">Links</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 bg-[#EFECFE] px-[3vh] py-[1vh] rounded-md text-[#633BFB] cursor-pointer transition-all hover:text-black">
                      <CgProfile />
                      <span className="">Profile Details</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <button className="bg-[#EFECFE] px-[3vh] py-[1vh] font-semibold rounded-md text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black">
                  Preview
                </button>
              </div>
            </>
          )}

          {!user?.data?._id && (
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
          )}
        </div>
      </div>
    </nav>
  );
}
