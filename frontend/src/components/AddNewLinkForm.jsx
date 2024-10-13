import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

import { useEffect, useState } from "react";
import { LuEqual, LuLink } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import validateUrl from "../utlis/urlValidator";
import socialMediaOptions from "../utlis/socialMediaList";

export default function AddNewLinkForm({
  linkItem,
  currentLinkItems,
  isDeleteLinkPending,
  onSocialSelect,
  onSetLinkIdentifier,
  onRemoveNewLinkHandler,
  onError,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSocial, setSelectedSocial] = useState(null);

  // Pre-fill form
  useEffect(() => {
    const existingLinkItem = currentLinkItems?.find(
      (item) => item.id === linkItem.id
    );
    if (existingLinkItem) {
      setSelectedSocial(existingLinkItem.platformName);
      setLinkValue(existingLinkItem.platformName.url);
    }
  }, [currentLinkItems, linkItem.id]);

  const handleSelect = (option) => {
    setSelectedSocial(option);
    setLinkValue(option.url);
    setIsOpen(false);

    const isValid = validateUrl(option.url, option.value);
    if (!isValid) {
      setErrorMessage(
        `Please enter a valid ${option.name} URL (must include '/<username>' part).`
      );
      onError(linkItem.id, true);
    } else {
      setErrorMessage("");
      onError(linkItem.id, false);
    }

    onSocialSelect(linkItem.id, { ...option, url: option.url });
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setLinkValue(newValue);

    if (selectedSocial) {
      const updatedSocial = { ...selectedSocial, url: newValue };
      setSelectedSocial(updatedSocial);
      onSocialSelect(linkItem.id, updatedSocial);

      const isValid = validateUrl(newValue, selectedSocial.value);
      if (!isValid) {
        setErrorMessage(
          `Please enter a valid ${selectedSocial.name} URL (must include '/<username>' part).`
        );
        onError(linkItem.id, true);
      } else {
        setErrorMessage("");
        onError(linkItem.id, false);
      }
    } else if (!validateUrl(newValue, newValue)) {
      setErrorMessage("Please select a platform first");
      onError(linkItem.id, true);
    } else {
      setErrorMessage("");
      onError(linkItem.id, false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] mb-6 p-4 rounded-lg">
      <div className="text-[#767676] mb-4">
        <div className="text-sm flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center gap-1">
            <LuEqual />
            <span className="font-semibold">
              Link #{linkItem && linkItem.id}
            </span>
          </div>
          <button
            type="button"
            disabled={isDeleteLinkPending}
            onClick={() => {
              onRemoveNewLinkHandler(linkItem.id);
              onSetLinkIdentifier(linkItem.id);
            }}
            className="transition-all hover:text-red-700">
            Remove
          </button>
        </div>
      </div>

      <div className="text-[13px] text-[#767676] mb-4">
        <label htmlFor="platform" className="mb-1">
          Platform
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 w-full">
            {selectedSocial ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Only render a single icon */}
                  {selectedSocial.name === "Facebook" && <FaFacebook />}
                  {selectedSocial.name === "Github" && <FaGithub />}
                  {selectedSocial.name === "Twitter" && <FaTwitter />}
                  {selectedSocial.name === "Linkedin" && <FaLinkedin />}
                  {selectedSocial.name === "Instagram" && <FaInstagram />}
                  {selectedSocial.name}
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
        <label htmlFor="link" className="mb-1">
          Link
        </label>
        <div className="w-full relative">
          <LuLink className="absolute left-[10px] top-[11px]" />
          <input
            type="text"
            className="w-full py-2 border rounded-lg pl-8 pr-4 focus:outline-none focus:ring-1"
            onChange={handleInputChange}
            value={linkValue}
          />
        </div>
        {errorMessage && (
          <p className="mt-1 ml-1 text-red-700 text-xs">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
