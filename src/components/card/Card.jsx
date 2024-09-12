import { HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { truncateString } from "../../utils/method/method";
import { DOMAIN_IMG } from "../../utils/setting/internal-variable";
import { unLikeProductApiAsync } from "../../apis/product/unLikeProduct/unLikeProduct.api";
import { likeProductApiAsync } from "../../apis/product/likeProduct/likeProduct.api";
import userNotification from "../../customHook/userNotification/userNotification";
import { addToCart } from "../../redux/reducel/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const Card = ({
  product,
  productFavorite = [],
  handleLoadingData,
  type = "",
}) => {
  const dispatch = useDispatch();
  const { openNotification } = userNotification();
  const [widthCard, setWidthCard] = useState("(100%-36px)/4");
  const size = useWindowSize();
  const { isLogin } = useCheckLogin();
  const { cart } = useSelector((state) => state.cartReducer);

  const handleFavoriteProduct = async (id) => {
    let contentNotification = "";
    let type = "";

    if (isLogin) {
      const status = productFavorite.some(
        (item) => Number(item.id) === Number(id)
      );

      switch (status) {
        case true:
          const resUnLike = await unLikeProductApiAsync(id);
          if (resUnLike.statusCode === 200) {
            type = "success";
            contentNotification = resUnLike.content;
          }
          break;
        case false:
          const resLike = await likeProductApiAsync(id);
          if (resLike.statusCode === 200) {
            type = "success";
            contentNotification = resLike.content;
          }
          break;
        default:
          break;
      }
    } else {
      type = "warning";
      contentNotification = "Login to add favorite products";
    }

    handleLoadingData();
    openNotification(type, "Favorite product", contentNotification);
  };

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

  const handleResize = () => {
    if (size.width >= 1024) {
      setWidthCard("(100%-36px)/4");
    } else if (size.width <= 768 && size.width > 600) {
      setWidthCard("(100%-24px)/3");
    } else if (size.width <= 600 && size.width > 480) {
      setWidthCard("(100%-12px)/2");
    } else if (size.width <= 480) {
      setWidthCard("(100%)");
    }
  };

  useEffect(() => {
    handleResize();
  }, [size.width]);

  return (
    <div
      className={`w-[calc(${widthCard})] bg-[#f8f8f8] shadow-[rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px] flex flex-col justify-between`}
      style={{
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
    >
      <div className="bg-[#F8F8F8] relative px-5 py-5">
        <div className="flex justify-end">
          <HeartFilled
            onClick={() => {
              handleFavoriteProduct(product.id);
            }}
            className={`text-2xl cursor-pointer hover:text-red-600 transition-all duration-400 ease-in-out ${
              productFavorite !== null
                ? productFavorite.some((item) => item.id === Number(product.id))
                  ? "text-red-600"
                  : "text-gray-300"
                : "text-gray-300"
            }`}
          />
        </div>
        <NavLink to={`/product/${product.id}`}>
          <img
            className="w-[100%] mx-auto py-5"
            src={`${
              product.image.startsWith("https://")
                ? product.image
                : `${DOMAIN_IMG}${product.image}`
            }`}
            alt="img product"
          />
          <div>
            <h1 className="font-medium">{product.name}</h1>
            {type !== "favorite" && (
              <p>{truncateString(product.description, 20)}</p>
            )}
          </div>
        </NavLink>
      </div>
      {type !== "favorite" && (
        <div className="flex items-center w-full text-center">
          <Button
            onClick={() => {
              handleAddToCart(product);
            }}
            disabled={cart.some(
              (item) => Number(item.id) === Number(product.id)
            )}
            className={`bg-[#9DE167] w-[70%] p-2 font-medium py-5 rounded-none border-none `}
          >
            {cart.some((item) => Number(item.id) === Number(product.id))
              ? "Already in cart"
              : "Add to cart"}
          </Button>
          <div className="bg-[#DEDDDC] w-[30%] p-2 font-semibold">{`${product.price}$`}</div>
        </div>
      )}
    </div>
  );
};

export default Card;
