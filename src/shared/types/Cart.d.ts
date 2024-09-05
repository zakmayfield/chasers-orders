import { Cart, CartItem } from '@prisma/client';
import { TCategory, TProduct, TProductVariant } from './Product';

// export type TCart = Cart;
// export type TCartItem = CartItem;

// export type TCartWithItems = TCart & {
//   items: CartItem[];
// };

// export type TCartItemWithProductVariant = TCartItem & {
//   product_variant: TProductVariant;
// };

// export type TCartWithItemsAndProductVariants = TCart & {
//   items: TCartItemWithProductVariant[];
// };

// UPDATED TYPES
export type TCart = Cart & {
  items: TCartItem[];
};

export type TCartItem = CartItem & {
  product_variant:
    | (TProductVariant & {
        product:
          | (TProduct & {
              category: TCategory | null;
            })
          | null;
      })
    | null;
};

export type TCreateCartItemRequestPayload = {
  product_variant_id?: string;
  product_id?: string;
};
