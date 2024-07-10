import { restClient } from "@/config/restClient";
import { getLoginURL, getRegisterURL } from "./baseURL";

export const login = async (body: any) => {
  const rest = await restClient();
  const formData = new FormData();
  formData.append("username", body.username);
  formData.append("password", body.password);
  return rest.post(getLoginURL(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const register = async (body: any) => {
  const rest = await restClient();
  return rest.post(getRegisterURL(), body);
};
