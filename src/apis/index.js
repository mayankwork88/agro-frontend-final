import axios from "axios";

const BASE_URL_LOCAL = "http://localhost:8085/api/v1";
const BASE_URL_DEV = "http://agritech.psiborg.io:4002/";

const client = axios.create({ baseURL: BASE_URL_DEV });
const BEARER_TOKEN =
  `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` || "";

export const apiRequest = async ({ ...options }) => {
  client.defaults.headers.Authorization = BEARER_TOKEN;

  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("currentTab");
      window.location.reload();
    }
    return error;
  };
  if (
    JSON.parse(localStorage.getItem("user")) ||
    options?.url === "/api/user/login"
  ) {
    try {
      const response = await client(options);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  }
};
