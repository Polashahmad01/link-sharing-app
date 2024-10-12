export const formDataFormatter = (unFormattedData) => {
  return Object.entries(unFormattedData).map(([id, platformName]) => ({
    id,
    platformName,
  }));
};
