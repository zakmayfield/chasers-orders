import { LineItem, Order } from '@prisma/client';
import {
  TProductVariantWithProduct,
  TProductVariantWithProductAndCategory,
} from './Product';

export type TOrder = Order;
export type TLineItem = LineItem;

export type TLineItemWithProductData = LineItem & {
  product_variant: TProductVariantWithProductAndCategory;
};

export type TOrderWithLineItems = TOrder & {
  line_items: TLineItemWithProductData[];
};

export type TCreateOrderRequestPayload = {
  product_variant_id: TLineItem['product_variant_id'];
  quantity: TLineItem['quantity'];
}[];
