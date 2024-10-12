export default function validateUrl(url, platform) {
  const platformRegex = {
    facebook: /^https?:\/\/(www\.)?facebook\.com\/(?!$)([A-Za-z0-9_.-]+)\/?$/,
    github: /^https?:\/\/(www\.)?github\.com\/(?!$)([A-Za-z0-9_-]+)\/?$/,
    twitter: /^https?:\/\/(www\.)?twitter\.com\/(?!$)([A-Za-z0-9_]+)\/?$/,
    linkedin:
      /^https?:\/\/(www\.)?linkedin\.com\/in\/(?!$)([A-Za-z0-9_-]+)\/?$/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/(?!$)([A-Za-z0-9_.-]+)\/?$/,
  };

  const regex = platformRegex[platform];
  if (!regex) {
    return false;
  }
  return regex.test(url);
}
