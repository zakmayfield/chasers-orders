import { Product, Unit } from '@prisma/client';

export type ProductWithUnits = Product & {
  units: Unit[];
};
