import { Cart, CartItem } from '@prisma/client';
import { TProductVariant } from './Product';

export type TCart = Cart;
export type TCartItem = CartItem;

export type TCartWithItems = TCart & {
  items: CartItem[];
};

export type TCartItemWithProductVariant = TCartItem & {
  product_variant: TProductVariant;
};

export type TCartWithItemsAndProductVariants = TCart & {
  items: TCartItemWithProductVariant[];
};
