import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const Model = () => {
  const [modal, contextHolderModal] = Modal.useModal();

  const confirm = (titleModal, contentModal, okText, cancelText, okFn) => {
    modal.confirm({
      title: titleModal,
      icon: <ExclamationCircleOutlined />,
      content: contentModal,
      okText: okText,
      cancelText: cancelText,
      onOk: () => {
        okFn();
      },
    });
  };

  return { confirm, contextHolderModal };
};

export default Model;
