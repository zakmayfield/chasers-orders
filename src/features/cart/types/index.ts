import type { Cart, UnitsOnCart, Unit, Product } from '@prisma/client';

export type CartCache = Cart & {
  items: CartItem[];
};

export type CartItem = UnitsOnCart & {
  unit: Unit & {
    product: Product;
  };
};
