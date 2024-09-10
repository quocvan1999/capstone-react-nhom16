import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducel/authReducer";
import productReducer from "./reducel/productReducer";
import cartReducer from "./reducel/cartReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    cartReducer,
  },
});
