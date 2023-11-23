import type { Product as ProductType, Unit as UnitType } from '@prisma/client';

export type Product = ProductType & {
  units: Unit[];
};

export type Unit = UnitType;

export type UnitHandlerProps = {
  event: React.ChangeEvent<HTMLSelectElement>;
  rowIndex: number;
};

export type CartHandlerProps = {
  data: Unit[];
  rowIndex: number;
};
