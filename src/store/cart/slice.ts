import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCartState } from './../../utils/getCartState';
import { ICartState, TCartObj } from './types';
import { totalCalc } from './../../utils/totalCalc';

const initialState: ICartState = getCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartPizza(state, { payload }: PayloadAction<TCartObj>) {
      const findCartPizza = state.cartPizzas.find(
        (prev) =>
          prev.name === payload.name && prev.size === payload.size && prev.type === payload.type,
      );
      if (findCartPizza) {
        findCartPizza.count++;
      } else {
        state.cartPizzas.push(payload);
      }
      state.totalCount = totalCalc(state.cartPizzas).totalCount;
      state.totalPrice = totalCalc(state.cartPizzas).totalPrice;
    },
    addCartPizza(state, { payload }: PayloadAction<string>) {
      const findCart = state.cartPizzas.find((prev) => prev.id === payload);
      if (findCart) {
        findCart.count++;
      }
      state.totalCount = totalCalc(state.cartPizzas).totalCount;
      state.totalPrice = totalCalc(state.cartPizzas).totalPrice;
    },
    minusCartPizza(state, { payload }: PayloadAction<string>) {
      const findCart = state.cartPizzas.find((prev) => prev.id === payload);
      if (findCart) {
        findCart.count--;
      }
      state.totalCount = totalCalc(state.cartPizzas).totalCount;
      state.totalPrice = totalCalc(state.cartPizzas).totalPrice;
    },
    clearCartPizza(state) {
      state.cartPizzas = [];
      state.totalCount = totalCalc(state.cartPizzas).totalCount;
      state.totalPrice = totalCalc(state.cartPizzas).totalPrice;
    },
    removeCartPizza(state, { payload }: PayloadAction<string>) {
      state.cartPizzas = state.cartPizzas.filter((prev) => prev.id !== payload);
      state.totalCount = totalCalc(state.cartPizzas).totalCount;
      state.totalPrice = totalCalc(state.cartPizzas).totalPrice;
    },
  },
});
export const { setCartPizza, addCartPizza, minusCartPizza, removeCartPizza, clearCartPizza } =
  cartSlice.actions;
export default cartSlice.reducer;
