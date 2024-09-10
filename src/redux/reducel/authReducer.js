import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  proFile: [],
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setProfile: (state, action) => {
      state.proFile = action.payload;
    },
    cleanProfile: (state) => {
      state.proFile = [];
    },
  },
});

export const { setIsLogin, setProfile, cleanProfile } = authReducer.actions;
export default authReducer.reducer;
