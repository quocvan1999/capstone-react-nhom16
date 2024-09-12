import { Button, Carousel, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getItemCaroucelApiAsync } from "../../apis/product/caroucel/caroucel.api";
import { DOMAIN_IMG } from "../../utils/setting/internal-variable";
import { useEffect } from "react";
import "./caroucel.css";
import { addToCart } from "../../redux/reducel/cartReducer";
import userNotification from "../../customHook/userNotification/userNotification";

const Caroucel = () => {
  const dispatch = useDispatch();
  const { openNotification } = userNotification();
  const { caroucelItem } = useSelector((state) => state.productReducer);

  const handleAddToCart = (product) => {
    const newProduct = { ...product, count: 1 };
    const action = addToCart(newProduct);
    dispatch(action);
    openNotification(
      "success",
      "Add to card",
      "Product added to cart successfully"
    );
  };

  const getCaroucelApi = async () => {
    const action = getItemCaroucelApiAsync(1, 10);
    dispatch(action);
  };

  useEffect(() => {
    getCaroucelApi();
  }, []);

  return (
    <>
      {caroucelItem && caroucelItem.length > 0 ? (
        <Carousel autoplay arrows draggable dots={false} infinite={true}>
          {caroucelItem.map((item, index) => (
            <NavLink
              to={`/product/${item.id}`}
              className="w-full !flex items-center px-20 hover:text-black"
              key={index}
            >
              <div className="w-[50%] flex justify-center">
                <img
                  className="w-[70%] inline-block"
                  src={`${DOMAIN_IMG}${item.image}`}
                  alt="caroucel img"
                />
              </div>
              <div className="w-[50%]">
                <h1 className="text-3xl font-medium leading-10 capitalize">
                  {item.name}
                </h1>
                <p className="text-[16px] leading-5 font-light pt-1 pb-8">
                  {item.shortDescription}
                </p>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#F8B653] hover:!bg-[#f8b653bd] px-10 py-2 text-white hover:!text-white rounded-none border-none"
                >
                  Buy now
                </Button>
              </div>
            </NavLink>
          ))}
        </Carousel>
      ) : (
        <Spin className="w-full text-center" />
      )}
    </>
  );
};

export default Caroucel;
