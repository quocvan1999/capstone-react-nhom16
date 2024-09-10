import { Carousel, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getItemCaroucelApiAsync } from "../../apis/product/caroucel/caroucel.api";
import { DOMAIN_IMG } from "../../utils/setting/internal-variable";
import { useEffect } from "react";
import "./caroucel.css";

const Caroucel = () => {
  const dispatch = useDispatch();
  const { caroucelItem } = useSelector((state) => state.productReducer);

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
            <div className="w-full !flex items-center px-20" key={index}>
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
                <NavLink className="bg-[#F8B653] hover:bg-[#f8b653bd] px-10 py-2 text-white hover:text-white">
                  Buy now
                </NavLink>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <Spin className="w-full text-center" />
      )}
    </>
  );
};

export default Caroucel;
