'use server';
import { db } from '@/lib/prisma';
import { TOrder, TOrderWithLineItems } from '@/shared/types/Order';

type TGetOrdersByUserId = (props: { user_id: string }) => Promise<TOrder[]>;
export const getOrdersByUserId: TGetOrdersByUserId = async ({ user_id }) => {
  const orders = await db.order.findMany({
    where: { user_id },
  });
  return orders;
};

type TGetOrderById = (props: { order_id: string }) => Promise<TOrder | null>;
export const getOrderById: TGetOrderById = async ({ order_id }) => {
  const order = await db.order.findUnique({
    where: { order_id },
  });
  return order;
};

type TGetOrdersWithLineItemsByUserId = (props: {
  user_id: string;
}) => Promise<TOrderWithLineItems[]>;
export const getOrdersWithLineItemsByUserId: TGetOrdersWithLineItemsByUserId =
  async ({ user_id }) => {
    const orders = await db.order.findMany({
      where: { user_id },
      include: { line_items: true },
    });
    return orders;
  };

type TGetOrderWithLineItemsById = (props: {
  order_id: string;
}) => Promise<TOrderWithLineItems | null>;
export const getOrderWithLineItemsById: TGetOrderWithLineItemsById = async ({
  order_id,
}) => {
  const order = await db.order.findUnique({
    where: { order_id },
    include: { line_items: true },
  });
  return order;
};
