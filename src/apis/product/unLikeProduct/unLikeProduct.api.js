import { http } from "../../../utils/setting/setting";

export const unLikeProductApiAsync = async (id) => {
  const res = await http.get(`/api/Users/unlike?productId=${id}`);
  return res.data;
};
