import type {
  Cart,
  Product as ProductType,
  Unit as UnitType,
  UnitsOnCart,
} from '@prisma/client';

export type Product = ProductType & {
  units: Unit[];
};

export type Unit = UnitType;

export type ChangeUnitHandlerProps = {
  event: React.ChangeEvent<HTMLSelectElement>;
  rowIndex: number;
};

export type CartHandlerProps = {
  units: Unit[];
  rowIndex: number;
};

export type RefinedCartItem = {
  productId: string;
  unitId: string;
  productName: string;
  productCategory: string;
  unitPrice: number;
  unitSize: string;
  unitCode: string;
  cartQuantity: number;
};

export type CartType = Omit<Cart, 'userId'> & {
  items: CartItems[];
};

type CartItems = Omit<UnitsOnCart, 'cartId' | 'unitId'> & {
  quantity: number;
  unit: UnitWithProduct;
};

type UnitWithProduct = Omit<UnitType, 'productId'> & {
  product: ProductType;
};
