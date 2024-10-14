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
    <div className="">
      <ul className="flex flex-wrap flex-col mb-2">
        {linkInfo?.platformName && linkInfo?.id && (
          <li
            className={`${
              linkInfo?.platformName?.name === "Facebook" &&
              "bg-[#0765FF] text-white"
            } ${
              linkInfo?.platformName?.name === "Github" &&
              "bg-[#6e5494] text-white"
            } ${
              linkInfo?.platformName?.name === "Twitter" &&
              "bg-[#1da1f2] text-white"
            } ${
              linkInfo?.platformName?.name === "Linkedin" &&
              "bg-[#0B65C2] text-white"
            } ${
              linkInfo?.platformName?.name === "Instagram" &&
              "bg-[#5b51d8] text-white"
            } border rounded-lg px-4 py-2 text-sm flex flex-wrap items-center justify-between transition-all hover:opacity-90`}>
            <div className="flex items-center flex-wrap gap-3">
              {linkInfo?.platformName?.name === "Facebook" && <FaFacebook />}
              {linkInfo?.platformName?.name === "Github" && <FaGithub />}
              {linkInfo?.platformName?.name === "Twitter" && <FaTwitter />}
              {linkInfo?.platformName?.name === "Linkedin" && <FaLinkedin />}
              {linkInfo?.platformName?.name === "Instagram" && <FaInstagram />}
              <span>{linkInfo?.platformName?.name}</span>
            </div>
            <FaArrowRight />
          </li>
        )}
        {!linkInfo?.id === false && !linkInfo?.platformName && (
          <li className="font-semibold rounded-lg py-[2px] text-sm bg-[#FAFAFA] w-full">
            <span className="opacity-0">Empty link</span>
          </li>
        )}
      </ul>
    </div>
  );
}
