import { setProducts } from "../../../redux/reducel/productReducer";
import { http } from "../../../utils/setting/setting";

export const getAllProductApiAsync = (currentPage, pageSize) => {
  return async (dispatch) => {
    const res = await http.get(
      `/api/Product/getpaging?pageIndex=${currentPage}&pageSize=${pageSize}`
    );

    const action = setProducts(res.data.content);
    dispatch(action);
  };
};
