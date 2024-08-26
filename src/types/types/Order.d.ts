import { LineItem, Order } from '@prisma/client';

export type TOrder = Order;
export type TLineItem = LineItem;

export type TOrderWithLineItems = TOrder & {
  line_items: TLineItem[];
};
