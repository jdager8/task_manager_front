import axios from "axios";

export const restClient = async () => {
  const client = axios.create({
    baseURL: process.env.BACK_URL,
    timeout: 5000,
  });

  return client;
};
