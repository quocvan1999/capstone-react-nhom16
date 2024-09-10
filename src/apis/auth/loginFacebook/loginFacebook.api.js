import { http } from "../../../utils/setting/setting";

export const loginFacebook = async (token) => {
  const res = await http.post("/api/Users/facebooklogin", token);
  return res.data;
};
