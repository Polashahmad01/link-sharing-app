const VITE_APP_BASE_API_URL =
  import.meta.env?.VITE_APP_BASE_API_URL || "http://localhost:8000";

const makeApiRequest = async (endpoint, options) => {
  return await fetch(`${VITE_APP_BASE_API_URL}${endpoint}`, options);
};

export default makeApiRequest;
