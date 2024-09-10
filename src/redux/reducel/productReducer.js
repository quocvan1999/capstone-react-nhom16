import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productFavorite: [],
  caroucelItem: [],
  detailProduct: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductFavorite: (state, action) => {
      state.productFavorite = action.payload;
    },
    setCleanProductFavorite: (state) => {
      state.productFavorite = [];
    },
    setCaroucelItem: (state, action) => {
      state.caroucelItem = action.payload;
    },
    setDetailProduct: (state, action) => {
      state.detailProduct = action.payload;
    },
  },
});

export const {
  setProducts,
  setCaroucelItem,
  setDetailProduct,
  setProductFavorite,
  setCleanProductFavorite,
} = productReducer.actions;
export default productReducer.reducer;
