import { setDetailProduct } from "../../../redux/reducel/productReducer";
import { http } from "../../../utils/setting/setting";

export const getDetailProductApiAsync = (id) => {
  return async (dispatch) => {
    const res = await http.get(`/api/Product/getbyid?id=${id}`);

    const action = setDetailProduct(res.data.content);
    dispatch(action);
  };
};
