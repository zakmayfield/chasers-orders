'use client';

import { getRecentOrders } from '@/services/queries/orders.getRecentOrders';
import { Order, OrderLineItem } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type OrderType = Order & {
  lineItems: OrderLineItem[];
};

const RecentOrders = () => {
  const params = useSearchParams();
  const [expanded, setExpanded] = useState<OrderType | null>();
  const orderId = params.get('orderId');

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<OrderType[]>({
    queryKey: ['recent-orders'],
    queryFn: getRecentOrders,
    /*
      `recent-orders` cache will only get fetched on initial page load &
      cache data will update within the onSuccess of the createOrder mutation
    */
    staleTime: Infinity,
  });

  useEffect(() => {
    const orderFromParams = orders?.find((order) => order.id === orderId);
    setExpanded(orderFromParams);
  }, [orderId, orders]);

  if (error && error instanceof Error) {
    return <div>{error.message}</div>;
  }

  const handleExpanded = (order: OrderType) => {
    if (expanded) {
      setExpanded(null);
    } else {
      setExpanded(order);
    }
  };

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
              <p onClick={() => handleExpanded(order)}>{createdAtDate}</p>

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
