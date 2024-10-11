import makeApiRequest, { headers } from "./base.service";

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
