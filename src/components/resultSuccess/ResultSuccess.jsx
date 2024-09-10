import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ResultSuccess = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Login successful"
      subTitle="You have successfully logged into the website."
      extra={[
        <Button
          key="goHomeButton"
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to home
        </Button>,
      ]}
    />
  );
};

export default ResultSuccess;
