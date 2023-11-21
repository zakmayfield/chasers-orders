import type { Product as ProductType, Unit as UnitType } from '@prisma/client';

export type Product = ProductType & {
  units: Unit[];
};

export type Unit = UnitType;
