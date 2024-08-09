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
import { DeliveryInstructionsData } from '@/types/user';

export type CartCache = Cart & {
  items: CartItem[];
};

export type CartItem = UnitsOnCart & {
  unit: Unit & {
    product: Product;
  };
};

export type CartWithItems = Cart & {
  items: UnitsOnCart[];
};

export type DeliveryInstructionsRequest = DeliveryInstructionsData;
export type DeliveryInstructionsResponse = {
  companyName: string;
  shippingAddress: ShippingAddress;
};

export type UpdateCartItemQuantityRequest = {
  cartId: string;
  unitId: string;
  quantity: number;
};

export type UpdateCartItemSizeRequest = {
  cartId: string;
  unitId: string;
  selectedUnitId: string | undefined;
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

export type RemoveCartItemRequest = {
  unitId: string;
  cartId: string;
};
export type RemoveCartItemResponse = {
  unitId: string;
};
