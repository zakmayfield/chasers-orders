import { LineItem, Order } from '@prisma/client';

export type TOrder = Order;
export type TLineItem = LineItem;

export type TOrderWithLineItems = TOrder & {
  line_items: TLineItem[];
};

export type TCreateOrderRequestPayload = {
  product_variant_id: TLineItem['product_variant_id'];
  quantity: TLineItem['quantity'];
}[];
