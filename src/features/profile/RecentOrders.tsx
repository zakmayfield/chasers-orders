'use client';

import { Order, OrderLineItem } from '@prisma/client';

export default function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div>
      <div>Recent Orders</div>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
}
