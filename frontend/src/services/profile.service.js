import makeApiRequest, { headers } from "./base.service";

export const saveProfileMutation = async (formData) => {
  const response = await makeApiRequest("/api/v1/profile", {
    headers,
    method: "POST",
    body: JSON.stringify(formData),
  });
  return await response.json();
};
