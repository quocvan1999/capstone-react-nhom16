import {
  FileTextOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Radio } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApiAsync } from "../../apis/auth/register/register.api";
import userNotification from "../../customHook/userNotification/userNotification";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { openNotification } = userNotification();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    gender: true,
  };

  const handleRegister = async (user) => {
    let type = "";
    const res = await registerApiAsync(user);

    switch (res.statusCode) {
      case 200:
        type = "success";
        setTimeout(() => {
          navigate("/auth");
        }, 500);
        break;
      default:
        type = "error";
        break;
    }

    openNotification(type, "Registe Notification", res.message);
  };

  const formRegister = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email cannot be left blank")
        .email("Email format is not correct"),
      name: Yup.string().required("Name cannot be left blank"),
      password: Yup.string().required("Password cannot be left blank"),
      phone: Yup.string().required("Phone cannot be left blank"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirm cannot be left blank"),
    }),
    onSubmit: (values) => {
      const { passwordConfirm, ...user } = values;
      handleRegister(user);
    },
  });

  return (
    <div className="w-[70%] mx-auto mt-10">
      <h1 className="text-3xl">Register</h1>
      <hr className="my-6" />

      <Form layout="vertical" onSubmitCapture={formRegister.handleSubmit}>
        <Flex className="w-full" gap={10}>
          <Form.Item
            className="w-[50%]"
            label="Email"
            validateStatus={
              formRegister.touched.email && formRegister.errors.email
                ? "error"
                : ""
            }
            help={formRegister.touched.email && formRegister.errors.email}
          >
            <Input
              prefix={<MailOutlined />}
              size="large"
              name="email"
              placeholder="Enter email"
              value={formRegister.values.email}
              onChange={formRegister.handleChange}
              onBlur={formRegister.handleBlur}
            />
          </Form.Item>
          <Form.Item
            className="w-[50%]"
            label="Name"
            validateStatus={
              formRegister.touched.name && formRegister.errors.name
                ? "error"
                : ""
            }
            help={formRegister.touched.name && formRegister.errors.name}
          >
            <Input
              prefix={<FileTextOutlined />}
              size="large"
              name="name"
              placeholder="Enter name"
              value={formRegister.values.name}
              onChange={formRegister.handleChange}
              onBlur={formRegister.handleBlur}
            />
          </Form.Item>
        </Flex>

        <Flex className="w-full" gap={10}>
          <Form.Item
            className="w-[50%]"
            label="Password"
            validateStatus={
              formRegister.touched.password && formRegister.errors.password
                ? "error"
                : ""
            }
            help={formRegister.touched.password && formRegister.errors.password}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              name="password"
              placeholder="Enter password"
              value={formRegister.values.password}
              onChange={formRegister.handleChange}
              onBlur={formRegister.handleBlur}
            />
          </Form.Item>
          <Form.Item
            className="w-[50%]"
            label="Phone"
            validateStatus={
              formRegister.touched.phone && formRegister.errors.phone
                ? "error"
                : ""
            }
            help={formRegister.touched.phone && formRegister.errors.phone}
          >
            <Input
              prefix={<PhoneOutlined />}
              size="large"
              name="phone"
              placeholder="Enter phone"
              value={formRegister.values.phone}
              onChange={formRegister.handleChange}
              onBlur={formRegister.handleBlur}
            />
          </Form.Item>
        </Flex>

        <Flex className="w-full" gap={10}>
          <Form.Item
            className="w-[50%]"
            label="Password Confirm"
            validateStatus={
              formRegister.touched.passwordConfirm &&
              formRegister.errors.passwordConfirm
                ? "error"
                : ""
            }
            help={
              formRegister.touched.passwordConfirm &&
              formRegister.errors.passwordConfirm
            }
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              name="passwordConfirm"
              placeholder="Enter password confirm"
              value={formRegister.values.passwordConfirm}
              onChange={formRegister.handleChange}
              onBlur={formRegister.handleBlur}
            />
          </Form.Item>

          <Form.Item label="Password Confirm" className="w-[50%]">
            <Radio.Group
              name="gender"
              value={formRegister.values.gender}
              onChange={formRegister.handleChange}
            >
              <Radio value={true} className="font-normal">
                Male
              </Radio>
              <Radio value={false} className="font-normal">
                Female
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Flex>
        <Form.Item>
          <div className="flex justify-end items-center gap-5">
            <Button
              htmlType="submit"
              className="uppercase bg-[#6200EE] text-white px-10 py-5 rounded-full"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
