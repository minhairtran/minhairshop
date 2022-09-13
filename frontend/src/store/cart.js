import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  loading: false,
  error: null,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addCartRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    addCartSuccess(state, action) {
      const { data, quantity } = action.payload;
      const addedProduct = state.cart.find((addedProduct) => {
        return addedProduct.product._id === data._id;
      });

      if (addedProduct === undefined) {
        state.cart.push({ product: data, quantity });
      } else {
        addedProduct.quantity += parseInt(quantity);
      }
      state.loading = false;
      state.error = null;
    },
    addCartFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeProductFromCartRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    removeProductFromCartSuccess(state, action) {
      const data = action.payload;
      const addedProduct = state.cart.find((addedProduct) => {
        return addedProduct.product._id === data._id;
      });

      if (addedProduct !== undefined) {
        state.cart = state.cart.filter(item => item.product._id !== addedProduct.product._id);
      } 
      state.loading = false;
      state.error = null;
    },
    removeProductFromCartFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
