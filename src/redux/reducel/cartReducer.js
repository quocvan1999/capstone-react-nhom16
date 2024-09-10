import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => Number(item.id) !== Number(action.payload)
      );
    },
    resetCart: (state) => {
      state.cart = [];
    },
    updateQuantity: (state, action) => {
      const { value, id } = action.payload;

      state.cart = state.cart.map((item) =>
        Number(item.id) === Number(id)
          ? { ...item, count: item.count + value }
          : item
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } =
  cartReducer.actions;
export default cartReducer.reducer;
