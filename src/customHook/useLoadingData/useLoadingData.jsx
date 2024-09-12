import { useDispatch } from "react-redux";
import { getProductFavoriteApiAsync } from "../../apis/product/getProductFavorite/GetProductFavorite.api";
import useCheckLogin from "../useCheckLogin/useCheckLogin";

const useLoadingData = () => {
  const dispatch = useDispatch();
  const { checkUserLogin, isLogin } = useCheckLogin();

  const getProductFavorite = async () => {
    const action = getProductFavoriteApiAsync;
    dispatch(action);
  };

  const handleLoadingData = () => {
    checkUserLogin();
    if (isLogin === true) {
      getProductFavorite();
    }
  };

  return { handleLoadingData };
};

export default useLoadingData;
