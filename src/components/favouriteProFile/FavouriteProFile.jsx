import { useEffect } from "react";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { useDispatch, useSelector } from "react-redux";
import { getProductFavoriteApiAsync } from "../../apis/product/getProductfavorite/GetProductFavorite.api";
import Card from "../card/Card";
import { Empty } from "antd";

const FavouriteProFile = () => {
  const dispatch = useDispatch();
  const { checkUserLogin, isLogin } = useCheckLogin();
  const { productFavorite } = useSelector((state) => state.productReducer);

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

  useEffect(() => {
    handleLoadingData();
  }, [isLogin]);

  return (
    <div className="w-full flex flex-wrap gap-3 mt-5">
      {isLogin === true && productFavorite && productFavorite?.length > 0 ? (
        productFavorite.map((item, index) => (
          <Card
            product={item}
            key={index}
            productFavorite={productFavorite}
            handleLoadingData={handleLoadingData}
            type="favorite"
          />
        ))
      ) : (
        <Empty className="w-full" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default FavouriteProFile;
