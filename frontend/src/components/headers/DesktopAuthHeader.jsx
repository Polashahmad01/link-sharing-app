import { Link, useNavigate } from "react-router-dom";
import { FaStaylinked } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { tabHandler } from "../../store/slice/tabSlice";
import { logout } from "../../store/slice/authSlice";
import { resetAllLinks } from "../../store/slice/linkSlice";
import { removeProfileInfo } from "../../store/slice/profileSlice";
import {
  getFromLocalStorage,
  clearFromLocalStorage,
} from "../../utlis/localStorage";

export default function DeskTopAuthHeader() {
  const navigate = useNavigate();
  const user = getFromLocalStorage("user");
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tab);

  const linkTabHandler = () => {
    dispatch(tabHandler({ tabName: "link" }));
  };

  const profieTabHandler = () => {
    dispatch(tabHandler({ tabName: "profile" }));
  };

  const logoutHandler = () => {
    clearFromLocalStorage("user");
    dispatch(removeProfileInfo());
    dispatch(logout());
    dispatch(tabHandler({ tabName: "" }));
    dispatch(resetAllLinks());
    navigate("/auth/login");
  };

  return (
    <nav className="container mx-auto">
      <div className="py-8">
        <div className="bg-white flex items-center justify-between px-8 py-4 rounded-lg">
          <Link to="/" className="flex items-center gap-1">
            <FaStaylinked size="25px" color="#2D68FF" />
            <div className="font-semibold text-[#505050] text-xl">devLinks</div>
          </Link>

          {user?.data?._id && (
            <>
              <div className="">
                <ul className="flex items-center gap-16">
                  <li>
                    <div
                      onClick={linkTabHandler}
                      className={`${
                        tabs.activeTab === "link" &&
                        "bg-[#EFECFE] text-[#633BFB]"
                      } flex items-center gap-2 px-[2vh] py-[1vh] rounded-lg cursor-pointer transition-all hover:text-black`}>
                      <HiOutlineExternalLink size="20px" />
                      <span className="">Links</span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={profieTabHandler}
                      className={`${
                        tabs.activeTab === "profile" &&
                        " bg-[#EFECFE] text-[#633BFB]"
                      } flex items-center gap-2 px-[2vh] py-[1vh] rounded-lg cursor-pointer transition-all hover:text-black`}>
                      <CgProfile />
                      <span className="">Profile Details</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`${window.location.origin}/link/${user?.data?._id}`}
                  target="_blank"
                  className="bg-[#EFECFE] px-[2vh] py-[1vh] font-semibold rounded-lg text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black">
                  Preview
                </Link>
                <div
                  onClick={logoutHandler}
                  className="bg-[#633BFB] text-white px-[2vh] py-[1vh] border border-[#633BFB] cursor-pointer rounded-lg transition-all hover:bg-[#EFECFE] hover:text-[#633BFB]">
                  Logout
                </div>
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
