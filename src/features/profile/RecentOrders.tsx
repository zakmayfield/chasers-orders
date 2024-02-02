'use client';

import { Order, OrderLineItem } from '@prisma/client';
import { useState } from 'react';

type RecentOrderDetails = {
  orders: OrderType[];
};

type OrderType = Order & {
  lineItems: OrderLineItem[];
};

const RecentOrders: React.FC<RecentOrderDetails> = ({ orders }) => {
  const [expanded, setExpanded] = useState<OrderType>();
  return (
    <div>
      <div>Recent Orders</div>

      {orders.map((order) => (
        <div key={order.id}>
          <p onClick={() => setExpanded(order)}>
            {order.createdAt.toUTCString()}
          </p>

          {expanded && expanded.id === order.id && (
            <pre>{JSON.stringify(expanded.lineItems, null, 2)}</pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
