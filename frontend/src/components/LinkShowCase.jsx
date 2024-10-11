import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaGithubSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import ProfileInfo from "./ProfileInfo";

export default function LinkShowCase() {
  const profileInfo = useSelector((state) => state.profile);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[#FAFAFA] border p-6 rounded-lg w-6/12">
        <ProfileInfo profileData={profileInfo} />
        <div>
          <ul className="flex flex-wrap flex-col gap-2">
            <li className="text-sm bg-black text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
              <FaGithubSquare />
              <span className="text-sm opacity-90">Github</span>
              <FaArrowRight />
            </li>

            <li className="text-sm bg-red-600 text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
              <FaYoutube />
              <span className="text-sm opacity-90">YouTube</span>
              <FaArrowRight />
            </li>

            <li className="text-sm bg-black text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
              <FaLinkedin />
              <span className="text-sm opacity-90">Linkedin</span>
              <FaArrowRight />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
