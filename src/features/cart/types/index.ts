import { z } from 'zod';
import type {
  Cart,
  UnitsOnCart,
  Unit,
  Product,
  ShippingAddress,
} from '@prisma/client';
import {
  QuantityValidator,
  DeliveryInstructionsValidator,
} from '@/features/cart/validator';

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
export type DeliveryInstructionsData = z.infer<
  typeof DeliveryInstructionsValidator
>;

export type DeliveryInstructionsResponse = {
  companyName: string;
  shippingAddress: ShippingAddress;
};

export type QuantityData = z.infer<typeof QuantityValidator>;

export type UpdateQuantity = {
  cartId: string;
  unitId: string;
  quantity: number;
};
