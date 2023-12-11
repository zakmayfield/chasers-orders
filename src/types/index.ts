import type { Product as ProductType, Unit as UnitType } from '@prisma/client';

export type Product = ProductType & {
  units: Unit[];
};

export type Unit = UnitType;

export type ChangeUnitHandlerProps = {
  event: React.ChangeEvent<HTMLSelectElement>;
  rowIndex: number;
};

export type CartHandlerProps = {
  data: Unit[];
  rowIndex: number;
};

export type RefinedCartItem = {
  productId: string;
  unitId: string;
  productName: string;
  productCategory: string;
  unitPrice: number;
  unitSize: string;
  cartQuantity: number;
};
