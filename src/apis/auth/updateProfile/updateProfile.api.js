import { http } from "../../../utils/setting/setting";

export const updateProfileApiAsync = async (user) => {
  const res = await http.post("/api/Users/updateProfile", user);
  return res.data;
};
