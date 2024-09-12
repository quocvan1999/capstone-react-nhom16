import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProductApiAsync } from "../../apis/product/getDetailProduct/GetDetailProduct.api";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin } from "antd";
import { addToCart } from "../../redux/reducel/cartReducer";
import userNotification from "../../customHook/userNotification/userNotification";
import Card from "../../components/card/Card";
import { getProductFavoriteApiAsync } from "../../apis/product/getProductfavorite/GetProductFavorite.api";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import useLoadingData from "../../customHook/useLoadingData/useLoadingData";
import { useWindowSize } from "@uidotdev/usehooks";

const Detail = () => {
  const size = useWindowSize();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { handleLoadingData } = useLoadingData();
  const [quantity, setQuantity] = useState(1);
  const { openNotification } = userNotification();
  const { checkUserLogin, isLogin } = useCheckLogin();
  const { detailProduct } = useSelector((state) => state.productReducer);
  const { productFavorite } = useSelector((state) => state.productReducer);
  const { cart } = useSelector((state) => state.cartReducer);

  const getDetailApi = async () => {
    const action = getDetailProductApiAsync(id);
    dispatch(action);
  };

  const handleAddToCart = (product) => {
    const newProduct = { ...product, count: quantity };
    const action = addToCart(newProduct);
    dispatch(action);
    openNotification(
      "success",
      "Add to card",
      "Product added to cart successfully"
    );
  };

  useEffect(() => {
    getDetailApi();
  }, [id]);

  return (
    <>
      {detailProduct ? (
        <div className="w-full">
          <div
            className={`flex items-start gap-3 ${
              size.width <= 600 ? "flex-col" : "flex-row"
            }`}
          >
            <div
              className={`${
                size.width <= 600 ? "w-[100%]" : "w-[40%]"
              } bg-[#F8F8F8] flex justify-center`}
            >
              <img
                src={detailProduct?.image}
                alt="product image"
                className="w-[80%]"
              />
            </div>
            <div className={`${size.width <= 600 ? "w-[100%]" : "w-[60%]"}`}>
              <h1 className="text-2xl font-medium capitalize">
                {detailProduct?.name}
              </h1>
              <p className="text-[16px] leading-5 font-light pt-2 pb-4 ">
                {detailProduct?.description}
              </p>
              <div>
                <p className="text-2xl text-[#1ED90E] mb-2">Available size</p>
                <div className="flex gap-2">
                  {detailProduct.size?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#CCCCCC] text-[#1E1D1D] w-[40px] h-[40px] font-semibold flex items-center justify-center"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-semibold text-[#FC0303] py-3">
                {detailProduct?.price}$
              </p>

              <div className="flex mb-2">
                <Button
                  disabled={cart.some(
                    (item) => Number(item.id) === Number(detailProduct.id)
                  )}
                  onClick={() => {
                    setQuantity((prevCount) => {
                      return prevCount + 1;
                    });
                  }}
                  className={`w-[40px] h-[40px] rounded-none text-white bg-gradient-to-b from-[#6181F3] to-[#7C97F5]  ${
                    cart.some(
                      (item) => Number(item.id) === Number(detailProduct.id)
                    )
                      ? ""
                      : "hover:!bg-gradient-to-b hover:!from-[#6181F3] hover:!to-[#7C97F5] hover:!text-white"
                  }`}
                >
                  +
                </Button>
                <div className="w-[40px] h-[40px] rounded-none flex items-center justify-center font-medium">
                  {quantity}
                </div>
                <Button
                  disabled={cart.some(
                    (item) => Number(item.id) === Number(detailProduct.id)
                  )}
                  onClick={() => {
                    setQuantity((prevCount) => {
                      if (prevCount > 1) {
                        return prevCount - 1;
                      } else {
                        return 1;
                      }
                    });
                  }}
                  className={`w-[40px] h-[40px] rounded-none text-white bg-gradient-to-b from-[#6181F3] to-[#7C97F5]  ${
                    cart.some(
                      (item) => Number(item.id) === Number(detailProduct.id)
                    )
                      ? ""
                      : "hover:!bg-gradient-to-b hover:!from-[#6181F3] hover:!to-[#7C97F5] hover:!text-white"
                  }`}
                >
                  -
                </Button>
              </div>

              <Button
                disabled={cart.some(
                  (item) => Number(item.id) === Number(detailProduct.id)
                )}
                onClick={() => {
                  handleAddToCart(detailProduct);
                }}
                className={`rounded-none py-5 font-medium text-white bg-gradient-to-l from-[#3E20F8] to-[#D017EE] px-6 ${
                  cart.some(
                    (item) => Number(item.id) === Number(detailProduct.id)
                  )
                    ? ""
                    : "hover:!bg-gradient-to-l hover:!from-[#3E20F8] hover:!to-[#D017EE] hover:!text-white"
                }`}
              >
                {cart.some(
                  (item) => Number(item.id) === Number(detailProduct.id)
                )
                  ? "Already in cart"
                  : "Add to cart"}
              </Button>
            </div>
          </div>

          <div className="w-full py-5">
            <h1 className="text-center text-2xl">-Realate Product-</h1>

            <div className="flex flex-wrap gap-3 mt-5">
              {detailProduct?.relatedProducts?.map((item, index) => (
                <Card
                  key={index}
                  product={item}
                  productFavorite={productFavorite}
                  handleLoadingData={handleLoadingData}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center py-10">
          <Spin />
        </div>
      )}
    </>
  );
};

export default Detail;
