import { notification } from "antd";

const userNotification = () => {
  const openNotification = (type, message, description) => {
    const config = {
      message: message,
      description: description,
      showProgress: true,
      pauseOnHover: true,
      placement: "bottomRight",
      duration: 1,
      key: Date.now(),
    };
    switch (type) {
      case "success":
        notification.success(config);
        break;
      case "error":
        notification.error(config);
        break;
      case "info":
        notification.info(config);
        break;
      case "warning":
        notification.warning(config);
        break;
      default:
        break;
    }
  };

  return { openNotification };
};

export default userNotification;
