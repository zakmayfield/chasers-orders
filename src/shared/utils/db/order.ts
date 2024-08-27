'use server';
import { db } from '@/lib/prisma';
import { TLineItem, TOrder, TOrderWithLineItems } from '@/shared/types/Order';

//^ POST
type TCreateOrder = (props: {
  user_id: string;
  line_items: TLineItem[];
}) => Promise<TOrder>;
export const createOrder: TCreateOrder = async ({ user_id, line_items }) => {
  const order = await db.order.create({
    data: {
      user_id,
      line_items: {
        create: line_items.map((lineItem) => ({
          product_variant_id: lineItem.product_variant_id,
          quantity: lineItem.quantity,
        })),
      },
    },
  });
  return order;
};

//^ GET
type TGetOrdersByUserId = (props: { user_id: string }) => Promise<TOrder[]>;
export const getOrdersByUserId: TGetOrdersByUserId = async ({ user_id }) => {
  const orders = await db.order.findMany({
    where: { user_id },
    orderBy: {
      created_at: 'desc',
    },
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
  take?: number;
}) => Promise<TOrderWithLineItems[]>;
export const getOrdersWithLineItemsByUserId: TGetOrdersWithLineItemsByUserId =
  async ({ user_id, take }) => {
    const orders = await db.order.findMany({
      take,
      where: { user_id },
      orderBy: {
        created_at: 'desc',
      },
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
