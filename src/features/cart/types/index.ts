import { z } from 'zod';
import type {
  Cart,
  UnitsOnCart,
  Unit,
  Product,
  Company,
  ShippingAddress,
} from '@prisma/client';
import { DeliveryInstructionsValidator } from '../validator/validator.delivery-instructions';

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
