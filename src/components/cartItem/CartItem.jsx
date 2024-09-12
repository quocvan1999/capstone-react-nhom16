import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import { DOMAIN_IMG } from "../../utils/setting/internal-variable";

const CartItem = ({ item, removeProduct, handelChangeCount }) => {
  return (
    <Card
      className="w-full mb-3"
      actions={[
        <Button
          className="border-none shadow-none"
          onClick={() => {
            removeProduct(item.id);
          }}
        >
          <DeleteOutlined className="text-red-600" />
        </Button>,
      ]}
    >
      <Flex gap={10}>
        <div className="w-[30%] flex items-center justify-center">
          <img
            src={
              item.image.startsWith("https://")
                ? item.image
                : `${DOMAIN_IMG}${item.image}`
            }
            className="w-[70%]"
            alt="img"
          />
        </div>
        <div className="w-[70%]">
          <Meta
            title={item.name}
            description={`${item.price
              .toLocaleString("en-US")
              .replace(/,/g, ".")}$`}
          />
          <div className="mt-4">
            <Flex align="center">
              <Button
                className="w-[30px] h-[30px]"
                onClick={() => handelChangeCount(1, item)}
              >
                +
              </Button>
              <div className="w-[30px] h-[30px] flex justify-center items-center">
                {item.count}
              </div>
              <Button
                className="w-[30px] h-[30px]"
                onClick={() => handelChangeCount(-1, item)}
              >
                -
              </Button>
            </Flex>
            <p className="font-semibold mt-2">{`${(item.count * item.price)
              .toLocaleString("en-US")
              .replace(/,/g, ".")}$`}</p>
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default CartItem;
