import { Card, Flex } from "antd";
import { DOMAIN_IMG } from "../../utils/setting/internal-variable";

const OrderHistoryItem = ({ order }) => {
  return (
    <Card className="w-full mb-3">
      <Flex gap={10}>
        <div className="w-[30%]">
          <img
            src={`${
              order.image.startsWith("https://")
                ? order.image
                : `${DOMAIN_IMG}${order.image}`
            }`}
            alt="image"
          />
        </div>
        <div className="w-[70%]">
          <h1 className="font-bold capitalize">{order.name}</h1>
          <p>{order.price.toLocaleString("en-US").replace(/,/g, ".")}$</p>
          <p className="mt-3">{order.quantity}</p>
          <p className="font-bold">
            {(order.price * order.quantity)
              .toLocaleString("en-US")
              .replace(/,/g, ".")}
            $
          </p>
        </div>
      </Flex>
    </Card>
  );
};

export default OrderHistoryItem;
