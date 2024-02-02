'use client';

import { getOrders } from '@/store/order.get';
import { Order, OrderLineItem } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export type OrderType = Order & {
  lineItems: OrderLineItem[];
};

const RecentOrders = () => {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState<OrderType>();

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<OrderType[]>({
    queryKey: ['recent-orders'],
    queryFn: getOrders,
  });

  if (error && error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div>Recent Orders</div>
      {orders && orders.length === 0 && <p>No recent orders.</p>}

      {isLoading && <div>Loading recent orders</div>}

      {orders &&
        orders.map((order) => {
          const createdAtDate = new Date(order.createdAt).toDateString();
          return (
            <div key={order.id}>
              <p onClick={() => setExpanded(order)}>{createdAtDate}</p>

              {expanded && expanded.id === order.id && (
                <pre>{JSON.stringify(expanded.lineItems, null, 2)}</pre>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default RecentOrders;
