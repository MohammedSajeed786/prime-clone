import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/shared/interfaces/CartItem';

export const createCart = createAction(
  'createCart',
  props<{ userCart: CartItem[] }>()
);
export const addToCart = createAction('addToCart', props<{ cartItem: CartItem }>());
export const removeFromCart = createAction(
  'removeFromCart',
  props<{ cartItemId: number }>()
);
export const clearCart = createAction('clearCart');
