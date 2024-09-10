import { http } from "../../../utils/setting/setting";

export const loginApiAsync = async (user) => {
  const res = await http.post("/api/Users/signin", user);
  return res.data;
};
