import {
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
    url: "https://facebook.com",
  },
  {
    name: "Github",
    icon: <FaGithub />,
    value: "github",
    url: "https://github.com",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    value: "twitter",
    url: "https://twitter.com",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedin />,
    value: "linkedin",
    url: "https://linkedin.com/in",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    value: "instagram",
    url: "https://instagram.com",
  },
];

export default socialMediaOptions;
