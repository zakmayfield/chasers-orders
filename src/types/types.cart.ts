import type { Cart, UnitsOnCart, Unit, Product } from '@prisma/client';

export type CartCache = Cart & {
  items: UnitsOnCartCacheType[];
};

type UnitsOnCartCacheType = Omit<
  UnitsOnCart & {
    unit: UnitCacheType;
  },
  'createdAt' | 'cartId'
>;

type UnitCacheType = Omit<
  Unit & {
    product: Omit<Product, 'id'>;
  },
  'id' | 'price' | 'productId'
>;
