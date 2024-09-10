import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../utils/method/method";
import userNotification from "../userNotification/userNotification";
import { useDispatch, useSelector } from "react-redux";
import { cleanProfile, setIsLogin } from "../../redux/reducel/authReducer";
import { getProFileApiAsync } from "../../apis/auth/getProFile/getProFile.api";

const useCheckLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openNotification } = userNotification();
  const { isLogin, proFile } = useSelector((state) => state.authReducer);

  const checkUserLogin = () => {
    const isToken = checkLogin();
    switch (isToken) {
      case true:
        const actionTrue = setIsLogin(true);
        const actionSetProfile = getProFileApiAsync;

        dispatch(actionSetProfile);
        dispatch(actionTrue);
        break;
      case false:
        const actionFalse = setIsLogin(false);
        const actionClean = cleanProfile();

        dispatch(actionClean);
        dispatch(actionFalse);
        openNotification(
          "warning",
          "Login Notification",
          "Session has expired"
        );
        setTimeout(() => {
          navigate("/auth");
        }, 500);
        break;
      default:
        const actionNull = setIsLogin(false);
        const actionCleanNull = cleanProfile();

        dispatch(actionCleanNull);
        dispatch(actionNull);
        break;
    }
  };

  return { checkUserLogin, isLogin, proFile };
};

export default useCheckLogin;
