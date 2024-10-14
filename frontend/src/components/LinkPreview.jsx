import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

export default function LinkPreview({ cardData }) {
  return (
    <div className="flex flex-wrap flex-col gap-8 bg-white p-4 rounded-2xl shadow-2xl min-w-[250px] sm:min-w-[350px] sm:p-12">
      {cardData && (
        <div className="flex flex-wrap flex-col gap-4">
          {cardData.profilePicture && (
            <div className="block mx-auto w-28 h-28 rounded-full border-4 border-[#613BFD]">
              <img
                src={cardData.profilePicture}
                alt={cardData.firstName + " " + cardData.lastName}
                className="rounded-full"
              />
            </div>
          )}
          {cardData.firstName && cardData.lastName && (
            <div className="flex flex-wrap justify-center items-center">
              <h6 className="text-2xl font-semibold">
                {cardData.firstName} {cardData.lastName}
              </h6>
            </div>
          )}
          {cardData.email && (
            <div className="flex flex-wrap justify-center items-center">
              <p className="text-[#6E6E6E] text-sm opacity-90">
                {cardData.email}
              </p>
            </div>
          )}

          {!cardData.profilePicture && (
            <div className="block mx-auto w-28 h-28 rounded-full border-4 bg-[#FAFAFA]">
              <div className="rounded-full" />
            </div>
          )}
          {!cardData.firstName && !cardData.lastName && (
            <div className="flex flex-wrap justify-center items-center bg-[#FAFAFA] border rounded-lg">
              <h6 className="text-2xl font-semibold opacity-0">Name</h6>
            </div>
          )}
          {!cardData.email && (
            <div className="flex flex-wrap justify-center items-center border bg-[#FAFAFA] rounded-lg">
              <p className="text-[#6E6E6E] text-2xl opacity-0">Email</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap flex-col gap-2">
        {cardData.links &&
          cardData.links.map((link) => (
            <Link
              key={link.id}
              to={link.platformName.url}
              target="_blank"
              className={`${
                link.platformName.name === "Facebook" &&
                "bg-[#0765FF] text-white"
              } ${
                link.platformName.name === "Github" && "bg-[#6e5494] text-white"
              } ${
                link.platformName.name === "Twitter" &&
                "bg-[#1da1f2] text-white"
              } ${
                link.platformName.name === "Linkedin" &&
                "bg-[#0B65C2] text-white"
              } ${
                link.platformName.name === "Instagram" &&
                "bg-[#5b51d8] text-white"
              } border flex flex-wrap items-center justify-between p-3 rounded-lg cursor-pointer transition-all hover:opacity-90`}>
              <div className="flex flex-wrap items-center gap-4">
                {link.platformName.name === "Facebook" && <FaFacebook />}
                {link.platformName.name === "Github" && <FaGithub />}
                {link.platformName.name === "Twitter" && <FaTwitter />}
                {link.platformName.name === "Linkedin" && <FaLinkedin />}
                {link.platformName.name === "Instagram" && <FaInstagram />}
                <p className="font-extralight text-sm">
                  {link.platformName.name}
                </p>
              </div>
              <FaArrowRight size="14px" className="opacity-90" />
            </Link>
          ))}

        {!cardData.links && (
          <div className="bg-[#FAFAFA] border borer-black flex flex-wrap items-center justify-between p-3 rounded-lg">
            <div className="flex flex-wrap items-center gap-4">
              <FaGithub className="opacity-0" size="22px" />
              <p className="font-extralight text-sm opacity-0">Github</p>
            </div>
            <FaArrowRight size="14px" className="opacity-0" />
          </div>
        )}
      </div>
    </div>
  );
}
