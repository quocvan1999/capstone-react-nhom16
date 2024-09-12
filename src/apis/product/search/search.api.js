import { http } from "../../../utils/setting/setting";

export const searchApiAsync = async (searchValue) => {
  const res = await http.get(`/api/Product?keyword=${searchValue}`);
  return res.data;
};
