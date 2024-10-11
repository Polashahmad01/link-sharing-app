const VITE_APP_BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

export const headers = {
  "Content-type": "application/json",
};

const makeApiRequest = async (endpoint, options) => {
  return await fetch(`${VITE_APP_BASE_API_URL}${endpoint}`, options);
};

export default makeApiRequest;
