'use server';
import { db } from '@/lib/prisma';
import { TLineItem, TOrder, TOrderWithLineItems } from '@/shared/types/Order';

//^ POST
// type TCreateOrder = (props: {
//   user_id: string;
//   line_items: TLineItem[];
// }) => Promise<TOrder>;
// export const createOrder: TCreateOrder = async ({ user_id, line_items }) => {
//   const order = await db.order.create({
//     data: {
//       user_id,
//       line_items: {
//         create: line_items.map((lineItem) => ({
//           product_variant_id: lineItem.product_variant_id,
//           quantity: lineItem.quantity,
//         })),
//       },
//     },
//   });
//   return order;
// };

//^ GET
type TGetOrdersByUserId = (props: {
  user_id: string;
  line_items?: boolean;
}) => Promise<TOrder[] | TOrderWithLineItems[]>;
export const getOrdersByUserId: TGetOrdersByUserId = async ({
  user_id,
  line_items = false,
}) => {
  const orders = await db.order.findMany({
    where: { user_id },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      line_items,
    },
  });
  return orders;
};

type TGetOrderById = (props: {
  order_id: string;
  line_items?: boolean;
}) => Promise<TOrder | TOrderWithLineItems | null>;
export const getOrderById: TGetOrderById = async ({
  order_id,
  line_items = false,
}) => {
  const order = await db.order.findUnique({
    where: { order_id },
    include: {
      line_items,
    },
  });
  return order;
};
