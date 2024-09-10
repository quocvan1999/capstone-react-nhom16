import { http } from "../../../utils/setting/setting";

export const likeProductApiAsync = async (id) => {
  const res = await http.get(`/api/Users/like?productId=${id}`);
  return res.data;
};
