import { FaArrowRight } from "react-icons/fa6";
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

export default function LinkItem({ linkInfo }) {
  return (
    <div className="my-1">
      <ul className="flex flex-wrap flex-col">
        {linkInfo?.id && (
          <li className="text-sm bg-black text-white flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer">
            {linkInfo?.platformName?.name === "Facebook" && <FaFacebook />}
            {linkInfo?.platformName?.name === "Github" && <FaGithub />}
            {linkInfo?.platformName?.name === "Twitter" && <FaTwitter />}
            {linkInfo?.platformName?.name === "Linkedin" && <FaLinkedin />}
            {linkInfo?.platformName?.name === "Instagram" && <FaInstagram />}
            <span className="text-sm opacity-90">
              {linkInfo?.platformName?.name}
            </span>
            <FaArrowRight />
          </li>
        )}
      </ul>
    </div>
  );
}
