import { setProfile } from "../../../redux/reducel/authReducer";
import { http } from "../../../utils/setting/setting";

export const getProFileApiAsync = async (dispatch) => {
  const res = await http.post("/api/Users/getProfile");
  const action = setProfile(res.data.content);
  dispatch(action);
};
