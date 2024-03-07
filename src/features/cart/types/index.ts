import type { Cart, UnitsOnCart, Unit, Product } from '@prisma/client';

// Cart cache
export type CartCache = Cart & {
  items: UnitsOnCartCacheType[];
};

export type UnitsOnCartCacheType = Omit<
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
