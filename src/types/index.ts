import type { Product as ProductType, Unit } from '@prisma/client';

export type Product = ProductType & {
  units: Unit[];
};
