import { authInstance } from "@apis/instance";

export const postEmailAuth = async (email: string) => {
  const postEmailURL = "/auth/verification/email";

  const response = await authInstance.post(postEmailURL, { email: email });

  console.log(response.data.data);

  return response.data.data;
};

export default postEmailAuth;
