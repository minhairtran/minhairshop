import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  loading: false,
  error: null,
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    listProductsRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    listProductsSuccess(state, action) {
      state.products = action.payload
      state.loading = false;
      state.error = null;
    },
    listProductsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    listProductRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    listProductSuccess(state, action) {
      state.product = action.payload
      state.loading = false;
      state.error = null;
    },
    listProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
