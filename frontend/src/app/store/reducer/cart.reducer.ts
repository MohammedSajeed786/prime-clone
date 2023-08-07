import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/shared/interfaces/CartItem';
import {
  addToCart,
  clearCart,
  createCart,
  removeFromCart,
} from '../action/cart.action';

const cart: CartItem[] = [];
export const cartReducer=createReducer(
  cart,
  on(createCart, (state, { userCart }) => {
    return userCart;
  }),
  on(addToCart, (state, { cartItem }) => {
    return [...state, cartItem];
  }),
  on(removeFromCart, (state, { cartItemId }) => {
    return state.filter((cartItem) => cartItem.cartItemId != cartItemId);
  }),
  on(clearCart, (state) => {
    return [];
  })
);
