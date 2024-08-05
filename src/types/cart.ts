import type {
  Cart,
  UnitsOnCart,
  Unit,
  Product,
  ShippingAddress,
  Prisma,
  Order,
  OrderLineItem,
} from '@prisma/client';

export type CartCache = Cart & {
  items: CartItem[];
};

export type CartItem = UnitsOnCart & {
  unit: Unit & {
    product: Product;
  };
};

export type DeliveryInstructionsResponse = {
  companyName: string;
  shippingAddress: ShippingAddress;
};

export type UpdateQuantity = {
  cartId: string;
  unitId: string;
  quantity: number;
};

export type CartSizesData = {
  id: string;
  product: {
    id: string;
    units: Unit[];
  };
};

export type OrderType = Order & {
  lineItems: OrderLineItem[];
};

export type OrderAgainData = {
  batchPayload: Prisma.BatchPayload;
  cartPayload: CartCache;
};
