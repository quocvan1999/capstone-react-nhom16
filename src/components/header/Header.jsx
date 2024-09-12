import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { useEffect } from "react";
import { Dropdown } from "antd";
import userNotification from "../../customHook/userNotification/userNotification";
import Model from "../modal/Model";
import { deleteCookie } from "../../utils/method/method";
import { useSelector } from "react-redux";
import { useWindowScroll } from "@uidotdev/usehooks";

const menuItems = [
  {
    key: "1",
    label: "Home",
    path: "/",
  },
  {
    key: "2",
    label: "Men",
    path: "/men",
  },
  {
    key: "3",
    label: "Woman",
    path: "/woman",
  },
  {
    key: "4",
    label: "Kid",
    path: "/kid",
  },
  {
    key: "5",
    label: "Sport",
    path: "/sport",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { checkUserLogin, isLogin, proFile } = useCheckLogin();
  const { openNotification } = userNotification();
  const { confirm, contextHolderModal } = Model();
  const [{ y }] = useWindowScroll();
  const { cart } = useSelector((state) => state.cartReducer);

  const okFn = () => {
    deleteCookie("accessToken");
    checkUserLogin();
    openNotification("success", "Logout Notification", "Logout successful");
    navigate("/auth");
  };

  const items = [
    {
      key: "1",
      label: <NavLink to="/profile">Thông tin tài khoản</NavLink>,
    },
    {
      key: "2",
      label: (
        <NavLink
          onClick={() => {
            confirm(
              "Log out Notification",
              "Do you want to log out?",
              "Log out",
              "Cancel",
              okFn
            );
          }}
        >
          Đăng xuất
        </NavLink>
      ),
    },
  ];

  useEffect(() => {
    checkUserLogin();
  }, [isLogin]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {contextHolderModal}
      <div className="bg-black text-white">
        <div className="max-w-[1024px] mx-auto flex justify-between items-center p-2">
          <NavLink to="/">
            <img src="../../../public/image 3.png" alt="Logi image" />
          </NavLink>
          <div className="flex items-center gap-5">
            <NavLink to="/product/result" className="flex items-center gap-1">
              <SearchOutlined className="text-2xl" />
              <span>Search</span>
            </NavLink>
            <NavLink to="/cart" className="relative">
              <ShoppingCartOutlined className="text-2xl" />
              <span className="flex bg-red-600 text-white items-center justify-center w-5 h-5 rounded-full absolute top-[-7px] right-[-10px]">
                {cart && cart.length}
              </span>
            </NavLink>
            <div>
              {isLogin === true ? (
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                  arrow
                >
                  <div
                    className={`border-2 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer bg-cover`}
                    style={{
                      backgroundImage: `url("${
                        proFile ? proFile.avatar : "../../../public/user.png"
                      }")`,
                    }}
                  ></div>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink to="/auth">Login</NavLink>
                  <NavLink to="/auth/register">Register</NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full ${y >= 50 && "bg-white shadow-md"}`}>
        <div className="max-w-[1024px] mx-auto flex items-center gap-5 p-2">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.key}
              className={({ isActive }) =>
                isActive ? "item-header-active" : "item-header"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
