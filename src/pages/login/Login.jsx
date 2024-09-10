import { FacebookFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { loginApiAsync } from "../../apis/auth/login/login.api";
import userNotification from "../../customHook/userNotification/userNotification";
import { setCookie } from "../../utils/method/method";
import { useEffect } from "react";
import useCheckLogin from "../../customHook/useCheckLogin/useCheckLogin";
import ResultSuccess from "../../components/resultSuccess/ResultSuccess";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { openNotification } = userNotification();
  const { checkUserLogin, isLogin } = useCheckLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    let type = "success";
    const res = await loginApiAsync(values);

    switch (res.statusCode) {
      case 200:
        type = "success";
        setCookie("accessToken", res.content.accessToken, 7);
        checkUserLogin();
        navigate("/");
        break;
      case 404:
        type = "error";
        break;
      default:
        break;
    }
    openNotification(type, "Login Notification", res.message);
  };

  const formLogin = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email cannot be left blank")
        .email("Email format is not correct"),
      password: Yup.string().required("Password cannot be left blank"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    checkUserLogin();
  }, [isLogin]);

  return (
    <>
      {isLogin === false ? (
        <div className="w-[70%] mx-auto mt-10">
          <h1 className="text-3xl">Login</h1>
          <hr className="my-6" />

          <Form layout="vertical" onSubmitCapture={formLogin.handleSubmit}>
            <Form.Item
              label="Email"
              validateStatus={
                formLogin.touched.email && formLogin.errors.email ? "error" : ""
              }
              help={formLogin.touched.email && formLogin.errors.email}
            >
              <Input
                prefix={<MailOutlined />}
                size="large"
                name="email"
                placeholder="Enter email"
                value={formLogin.values.email}
                onChange={formLogin.handleChange}
                onBlur={formLogin.handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              validateStatus={
                formLogin.touched.password && formLogin.errors.password
                  ? "error"
                  : ""
              }
              help={formLogin.touched.password && formLogin.errors.password}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                name="password"
                placeholder="Enter password"
                value={formLogin.values.password}
                onChange={formLogin.handleChange}
                onBlur={formLogin.handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-end items-center gap-5">
                <NavLink className="text-[#152AEBCC] font-bold">
                  Register now?
                </NavLink>
                <Button
                  htmlType="submit"
                  className="uppercase bg-[#6200EE] text-white px-10 py-5 rounded-full"
                >
                  Login
                </Button>
              </div>
            </Form.Item>
          </Form>

          <div>
            <NavLink className="flex items-center">
              <FacebookFilled className="text-blue-700 text-3xl" />
              <span>Continue with Facebook</span>
            </NavLink>
          </div>
        </div>
      ) : (
        <ResultSuccess />
      )}
    </>
  );
};

export default Login;
