import { setCaroucelItem } from "../../../redux/reducel/productReducer";
import { http } from "../../../utils/setting/setting";

export const getItemCaroucelApiAsync = (currentPage, pageSize) => {
  return async (dispatch) => {
    const res = await http.get(
      `/api/Product/getpaging?pageIndex=${currentPage}&pageSize=${pageSize}`
    );

    const action = setCaroucelItem(res.data.content.items);
    dispatch(action);
  };
};
