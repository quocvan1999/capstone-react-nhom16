import { useEffect, useState } from "react";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import { useFormik } from "formik";
import * as Yup from "yup";
import TitlePage from "../../components/titlePage/TitlePage";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Form, Input, Radio, Result, Tabs } from "antd";
import {
  FileTextOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { updateProfileApiAsync } from "../../apis/auth/updateProfile/updateProfile.api";
import userNotification from "../../customHook/userNotification/userNotification";
import Model from "../../components/modal/Model";
import OrderHistory from "../../components/orderHistory/OrderHistory";
import FavouriteProFile from "../../components/favouriteProFile/FavouriteProFile";

const items = [
  {
    key: "1",
    label: "Order history",
    children: <OrderHistory />,
  },
  {
    key: "2",
    label: "Favourite",
    children: <FavouriteProFile />,
  },
];

const ProFile = () => {
  const navigate = useNavigate();
  const { openNotification } = userNotification();
  const [isUpdate, setIsUpdate] = useState(false);
  const { confirm, contextHolderModal } = Model();
  const { checkUserLogin, isLogin, proFile } = useCheckLogin();

  const handleUpdateProFile = async (proFile) => {
    let notifiContent = "";
    let type = "";

    const res = await updateProfileApiAsync(proFile);

    if (res.statusCode === 200) {
      notifiContent = "Updated successfully";
      type = "success";
      checkUserLogin();
      setIsUpdate(!isUpdate);
    } else {
      notifiContent = res.content;
      type = "error";
    }

    openNotification(type, "Profile Notification", notifiContent);
  };

  const handleChangeUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const initialValues = {
    email: proFile.email,
    name: proFile.name,
    phone: proFile.phone,
    password: proFile.password,
    gender: proFile.gender,
  };

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email cannot be left blank")
        .email("Email format is not correct"),
      name: Yup.string().required("Name cannot be left blank"),
      phone: Yup.number().required("Phone number cannot be left blank"),
      password: Yup.string().required("Password cannot be left blank"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      confirm(
        "Profile Notification",
        "Would you like to update your profile?",
        "Update",
        "Cancel",
        () => {
          handleUpdateProFile(values);
        }
      );
    },
  });

  useEffect(() => {
    checkUserLogin();
  }, [isLogin]);

  return (
    <>
      {contextHolderModal}
      {isLogin === true && proFile ? (
        <div>
          <TitlePage title="Profile" width="50%" />
          <div className="w-full flex mt-5">
            <div className="w-[30%] flex justify-center">
              <Avatar size={140} src={proFile && proFile?.avatar} />
            </div>
            <div className="w-[70%]">
              <Form
                layout="vertical flex gap-3"
                onSubmitCapture={
                  !isUpdate ? handleChangeUpdate : formUpdate.handleSubmit
                }
              >
                <div className="w-[50%]">
                  <Form.Item
                    label="Email"
                    className="font-semibold"
                    validateStatus={
                      formUpdate.touched.email && formUpdate.errors.email
                        ? "error"
                        : ""
                    }
                    help={formUpdate.touched.email && formUpdate.errors.email}
                  >
                    {isUpdate ? (
                      <Input
                        prefix={<MailOutlined />}
                        size="large"
                        name="email"
                        placeholder="Enter email"
                        className="font-normal"
                        value={formUpdate.values.email}
                        onChange={formUpdate.handleChange}
                        onBlur={formUpdate.handleBlur}
                      />
                    ) : (
                      <p className="font-normal">{proFile.email}</p>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    className="font-semibold"
                    validateStatus={
                      formUpdate.touched.phone && formUpdate.errors.phone
                        ? "error"
                        : ""
                    }
                    help={formUpdate.touched.phone && formUpdate.errors.phone}
                  >
                    {isUpdate ? (
                      <Input
                        prefix={<PhoneOutlined />}
                        size="large"
                        name="phone"
                        placeholder="Enter phone"
                        className="font-normal"
                        value={formUpdate.values.phone}
                        onChange={formUpdate.handleChange}
                        onBlur={formUpdate.handleBlur}
                      />
                    ) : (
                      <p className="font-normal">{proFile.phone}</p>
                    )}
                  </Form.Item>
                </div>
                <div className="w-[50%]">
                  <Form.Item
                    label="Name"
                    className="font-semibold"
                    validateStatus={
                      formUpdate.touched.name && formUpdate.errors.name
                        ? "error"
                        : ""
                    }
                    help={formUpdate.touched.name && formUpdate.errors.name}
                  >
                    {isUpdate ? (
                      <Input
                        prefix={<FileTextOutlined />}
                        size="large"
                        name="name"
                        placeholder="Enter name"
                        className="font-normal"
                        value={formUpdate.values.name}
                        onChange={formUpdate.handleChange}
                        onBlur={formUpdate.handleBlur}
                      />
                    ) : (
                      <p className="font-normal">{proFile.name}</p>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    className="font-semibold"
                    validateStatus={
                      formUpdate.touched.password && formUpdate.errors.password
                        ? "error"
                        : ""
                    }
                    help={
                      formUpdate.touched.password && formUpdate.errors.password
                    }
                  >
                    {isUpdate ? (
                      <Input.Password
                        prefix={<LockOutlined />}
                        size="large"
                        name="password"
                        placeholder="Enter password"
                        className="font-normal"
                        value={formUpdate.values.password}
                        onChange={formUpdate.handleChange}
                        onBlur={formUpdate.handleBlur}
                      />
                    ) : (
                      <p className="font-normal">{proFile.password}</p>
                    )}
                  </Form.Item>
                  <Form.Item label="Gender" className="font-semibold">
                    <div className="flex items-center justify-between">
                      {isUpdate ? (
                        <Radio.Group
                          name="gender"
                          value={formUpdate.values.gender}
                          onChange={formUpdate.handleChange}
                        >
                          <Radio value={true} className="font-normal">
                            Male
                          </Radio>
                          <Radio value={false} className="font-normal">
                            Female
                          </Radio>
                        </Radio.Group>
                      ) : (
                        <p className="font-normal">
                          {proFile.gender === true ? "Nam" : "Nữ"}
                        </p>
                      )}
                      <Button htmlType="submit" type="primary">
                        {isUpdate ? "Save" : "Update"}
                      </Button>
                    </div>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      ) : (
        <Result
          status="warning"
          title="You must be logged in to view your profile"
          extra={
            <Button
              type="primary"
              key="goLoginPage"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Go to loginpage
            </Button>
          }
        />
      )}
    </>
  );
};

export default ProFile;
