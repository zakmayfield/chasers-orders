import { z } from 'zod';
import type { Cart, UnitsOnCart, Unit, Product } from '@prisma/client';
import { DeliveryInstructionsValidator } from '../validator/validator.delivery-instructions';

export type CartCache = Cart & {
  items: CartItem[];
};

export type CartItem = UnitsOnCart & {
  unit: Unit & {
    product: Product;
  };
};

//^ Delivery Instructions Validator
export type DeliveryInstructionsData = z.infer<
  typeof DeliveryInstructionsValidator
>;
