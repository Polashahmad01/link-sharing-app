import makeApiRequest, { headers } from "./base.service";

export const saveLinkMutation = async (formData) => {
  const response = await makeApiRequest("/api/v1/link", {
    headers,
    method: "POST",
    body: JSON.stringify(formData),
  });

  return await response.json();
};
