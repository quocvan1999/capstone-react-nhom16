import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import CartItem from "../../components/cartItem/CartItem";

const CartSmall = ({
  contextHolderModal,
  isLogin,
  cart,
  handleOrderSubmit,
  removeProduct,
  handelChangeCount,
}) => {
  return (
    <>
      {contextHolderModal}
      {isLogin === true ? (
        <div>
          <h1 className="text-3xl">Cart</h1>
          <hr className="my-6" />
          {cart &&
            cart?.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                removeProduct={removeProduct}
                handelChangeCount={handelChangeCount}
              />
            ))}
          <div className="text-center">
            <Button
              onClick={handleOrderSubmit}
              className="uppercase bg-[#F2994A] text-white px-5 border-none hover:!bg-[#f2984ac5] hover:!text-white mb-5 mt-10"
            >
              {cart.length > 0 ? "submit order" : "Go to homepage"}
            </Button>
          </div>
        </div>
      ) : (
        <Result
          status="warning"
          title="You need to login to view cart"
          extra={
            <NavLink
              to="/auth"
              className="bg-blue-500 text-white px-5 py-2 rounded-md font-medium hover:text-white hover:bg-blue-400"
              type="primary"
              key="goLoginPage"
            >
              Go to login page
            </NavLink>
          }
        />
      )}
    </>
  );
};

export default CartSmall;
