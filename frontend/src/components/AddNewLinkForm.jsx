import { useState } from "react";
import { LuEqual, LuLink } from "react-icons/lu";
import {
  FaAngleDown,
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

const socialMediaOptions = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    value: "facebook",
    url: "https://facebook.com/",
  },
  {
    name: "Github",
    icon: <FaGithub />,
    value: "github",
    url: "https://github.com/",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    value: "twitter",
    url: "https://twitter.com/",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedin />,
    value: "linkedin",
    url: "https://linkedin.com/",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    value: "instagram",
    url: "https://instagram.com/",
  },
];

export default function AddNewLinkForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

  const handleSelect = (option) => {
    setSelectedSocial(option);
    setIsOpen(false);
  };

  console.log(selectedSocial);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-[#FAFAFA] mb-6 p-4 rounded-lg">
      <div className="text-[#767676] mb-4">
        <div className="text-sm flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center gap-1">
            <LuEqual />
            <span className="font-semibold">Link #1</span>
          </div>
          <button>Remove</button>
        </div>
      </div>

      <div className="text-[13px] text-[#767676] mb-4">
        <label htmlFor="platform" className="mb-1">
          Platform
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 w-full">
            {selectedSocial ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedSocial.icon} {selectedSocial.name}
                </div>
                <FaAngleDown />
              </div>
            ) : (
              "Choose a platform"
            )}
          </button>
          {isOpen && (
            <ul className="absolute bg-white border rounded-md shadow-md z-10 w-full">
              {socialMediaOptions.map((option) => (
                <li
                  key={option.name}
                  onClick={() => handleSelect(option)}
                  className="flex items-center cursor-pointer p-2 hover:bg-gray-100">
                  {option.icon} <span className="ml-2">{option.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="text-[13px] text-[#767676]">
        <p className="mb-1">Link</p>
        <div className="w-full relative">
          <LuLink className="absolute left-[10px] top-[11px]" />
          <input
            type="text"
            className="w-full py-2 border rounded-lg pl-8 pr-4 focus:outline-none focus:ring-1"
            value={selectedSocial && selectedSocial.url}
          />
        </div>
      </div>
    </form>
  );
}
