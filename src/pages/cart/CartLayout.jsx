import React, { useEffect } from "react";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { Button, Flex, Result, Table } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DOMAIN_IMG } from "../../utils/setting/internal-variable";
import { DeleteOutlined } from "@ant-design/icons";
import Model from "../../components/modal/Model";
import {
  removeFromCart,
  resetCart,
  updateQuantity,
} from "../../redux/reducel/cartReducer";
import userNotification from "../../customHook/userNotification/userNotification";
import { orderApiAsync } from "../../apis/product/order/order.api";
import { useWindowSize } from "@uidotdev/usehooks";
import CartSmall from "./CartSmall";
import CartBig from "./CartBig";

const CartLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const { checkUserLogin, isLogin, proFile } = useCheckLogin();
  const { openNotification } = userNotification();
  const { confirm, contextHolderModal } = Model();
  const { cart } = useSelector((state) => state.cartReducer);

  const removeProduct = (id) => {
    confirm(
      "Cart Notification",
      "Do you want to remove the product from your cart?",
      "Delete",
      "Cancel",
      () => {
        dispatch(removeFromCart(id));
        openNotification(
          "success",
          "Cart Notification",
          "Product removed from cart successfully"
        );
      }
    );
  };

  const handelChangeCount = (value, record) => {
    if (Number(record.count) + value >= 1) {
      const action = updateQuantity({ value: value, id: record.id });
      dispatch(action);
    } else {
      removeProduct(record.id);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`${
            image.startsWith("https://") ? image : `${DOMAIN_IMG}${image}`
          }`}
          alt="img"
          width="70"
          height="70"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price}$`,
    },
    {
      title: "Quantity",
      dataIndex: "count",
      key: "count",
      render: (count, record) => (
        <Flex align="center">
          <Button
            className="w-[30px] h-[30px]"
            onClick={() => handelChangeCount(1, record)}
          >
            +
          </Button>
          <div className="w-[30px] h-[30px] flex justify-center items-center">
            {count}
          </div>
          <Button
            className="w-[30px] h-[30px]"
            onClick={() => handelChangeCount(-1, record)}
          >
            -
          </Button>
        </Flex>
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (record) => {
        return `${(record.count * record.price)
          .toLocaleString("en-US")
          .replace(/,/g, ".")}$`;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button
          className="border-none shadow-none"
          onClick={() => {
            removeProduct(record.id);
          }}
        >
          <DeleteOutlined className="text-red-600" />
        </Button>
      ),
    },
  ];

  const handleOrderSubmit = async () => {
    if (cart.length === 0) {
      navigate("/");
    } else {
      const data = cart.map((item) => ({
        productId: item.id,
        quantity: item.count,
      }));

      const order = {
        orderDetail: data,
        email: proFile && proFile.email,
      };

      confirm(
        "Cart Notification",
        "Do you want to order?",
        "Order",
        "Cancel",
        async () => {
          if (proFile) {
            let notifiContent = "";
            let type = "";
            const res = await orderApiAsync(order);

            if (res.statusCode === 200) {
              notifiContent = "Order successful";
              type = "success";
              const action = resetCart();
              dispatch(action);
            } else {
              notifiContent = res.content;
              type = "error";
            }
            openNotification(type, "Cart Notification", notifiContent);
          }
        }
      );
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  return (
    <>
      {size.width <= 600 ? (
        <CartSmall
          cart={cart}
          contextHolderModal={contextHolderModal}
          isLogin={isLogin}
          handleOrderSubmit={handleOrderSubmit}
          removeProduct={removeProduct}
          handelChangeCount={handelChangeCount}
        />
      ) : (
        <CartBig
          cart={cart}
          columns={columns}
          isLogin={isLogin}
          handleOrderSubmit={handleOrderSubmit}
          contextHolderModal={contextHolderModal}
        />
      )}
    </>
  );
};

export default CartLayout;
