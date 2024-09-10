import axios from "axios";
import { DOMAIN } from "./internal-variable";
import { getCookie } from "../method/method";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000,
});

http.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${getCookie("accessToken")}`,
    TokenCybersoft: getCookie("cbs"),
  };
  return req;
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return err.response;
  }
);
