export default function validateUrl(url, platform) {
  const baseUrls = {
    facebook: "https://facebook.com/",
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/",
    instagram: "https://instagram.com/",
  };

  const baseUrl = baseUrls[platform];
  if (!baseUrl) {
    return false;
  }
  return url.startsWith(baseUrl);
}
