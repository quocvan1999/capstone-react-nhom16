import { setProductFavorite } from "../../../redux/reducel/productReducer";
import { http } from "../../../utils/setting/setting";

export const getProductFavoriteApiAsync = async (dispatch) => {
  const res = await http.get(
    "https://shop.cyberlearn.vn/api/Users/getproductfavorite"
  );

  const action = setProductFavorite(res.data.content.productsFavorite);
  dispatch(action);
};
