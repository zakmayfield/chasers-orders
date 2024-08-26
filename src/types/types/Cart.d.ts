import { Cart, CartItem } from '@prisma/client';

export type TCart = Cart;
export type TCartItem = CartItem;

export type TCartWithItems = Cart & {
  items: CartItem[];
};
