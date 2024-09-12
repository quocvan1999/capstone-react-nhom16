import { Button, Flex, Input } from "antd";
import React, { useState } from "react";
import userNotification from "../../customHook/userNotification/userNotification";
import { setCookie } from "../../utils/method/method";

const SettingProject = () => {
  const [cookieValue, setCookieValue] = useState("");
  const { openNotification } = userNotification();

  const handleSetCookie = () => {
    setCookie("cbs", cookieValue, 7);
    setCookieValue("");
    openNotification(
      "success",
      "Login Notification",
      "Add Cybersoft token successfully"
    );
  };

  return (
    <Flex className="py-10">
      <Input
        placeholder="Enter token Cybersoft"
        className="rounded-e-none"
        value={cookieValue}
        onChange={(e) => setCookieValue(e.target.value)}
      />
      <Button
        className="rounded-s-none"
        type="primary"
        onClick={handleSetCookie}
      >
        Update
      </Button>
    </Flex>
  );
};

export default SettingProject;
