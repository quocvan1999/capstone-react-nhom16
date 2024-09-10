import { useEffect, useState } from "react";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { Collapse, Empty, Pagination, Table } from "antd";
import { formatDate } from "../../utils/method/method";
import { PlusOutlined } from "@ant-design/icons";

const OrderHistory = () => {
  const { checkUserLogin, isLogin, proFile } = useCheckLogin();
  const [itemsCollapse, setItemsCollapse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedOrders = proFile?.ordersHistory?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const itemsTable = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="image product" width={70} />,
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
      render: (price) => <p>{price}$</p>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_text, record, _index) => (
        <p>
          {(record.price * record.quantity)
            .toLocaleString("en-US")
            .replace(/,/g, ".")}
          $
        </p>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let content = [];
    if (paginatedOrders) {
      content = paginatedOrders.map((order, index) => ({
        key: index,
        label: `Orders have been placed on ${formatDate(order.date)}`,
        children: (
          <Table
            accordion
            columns={itemsTable}
            dataSource={order.orderDetail.map((detail, index) => ({
              ...detail,
              key: index,
            }))}
          />
        ),
      }));
    }
    setItemsCollapse(content);
  }, [proFile, paginatedOrders?.length > 0, currentPage]);

  return (
    <>
      {paginatedOrders?.length > 0 && itemsCollapse?.length > 0 ? (
        <div>
          <Collapse
            destroyInactivePanel={true}
            accordion={true}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => (
              <PlusOutlined rotate={isActive ? 90 : 0} />
            )}
            items={itemsCollapse}
          />
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            pageSize={pageSize}
            total={proFile?.ordersHistory.length} 
            onChange={handlePageChange}
            className="my-5"
            align="end"
          />
        </div>
      ) : (
        <Empty className="w-full" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default OrderHistory;
