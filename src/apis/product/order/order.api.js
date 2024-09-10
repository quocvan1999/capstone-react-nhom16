import { http } from "../../../utils/setting/setting";

export const orderApiAsync = async (order) => {
  const res = await http.post("/api/Users/order", order);
  return res.data;
};
