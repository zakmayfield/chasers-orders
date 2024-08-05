import type {
  Cart,
  UnitsOnCart,
  Unit,
  Product,
  ShippingAddress,
} from '@prisma/client';

//^ Cart Cache
export type CartCache = Cart & {
  items: CartItem[];
};

export type CartItem = UnitsOnCart & {
  unit: Unit & {
    product: Product;
  };
};

//^ Delivery Instructions
export type DeliveryInstructionsResponse = {
  companyName: string;
  shippingAddress: ShippingAddress;
};

export type UpdateQuantity = {
  cartId: string;
  unitId: string;
  quantity: number;
};

//^

export type CartSizesData = {
  id: string;
  product: {
    id: string;
    units: Unit[];
  };
};
