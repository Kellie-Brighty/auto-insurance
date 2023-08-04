import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "https://autoflex.universalinsuranceplc.com.ng/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((res) => {
  console.log(res);
  return res;
});

export default instance;
