import { http } from "../../../utils/setting/setting";

export const registerApiAsync = async (user) => {
  const res = await http.post("/api/Users/signup", user);
  return res.data;
};
