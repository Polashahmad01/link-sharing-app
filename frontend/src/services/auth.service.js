import makeApiRequest from "./base.service";

const headers = {
  "Content-type": "application/json",
};

export const registerMutation = async (formData) => {
  const response = await makeApiRequest("/api/v1/register", {
    headers,
    method: "POST",
    body: JSON.stringify(formData),
  });
  return await response.json();
};

export const loginMutation = async (formData) => {
  const response = await makeApiRequest("/api/v1/login", {
    headers,
    method: "POST",
    body: JSON.stringify(formData),
  });
  return await response.json();
};
