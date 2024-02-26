'use client';

import { useState } from 'react';
import { Order, OrderLineItem } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { getRecentOrders } from '@/services/queries/orders.getRecentOrders';

export type OrderType = Order & {
  lineItems: OrderLineItem[];
};

const RecentOrders = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<OrderType[]>({
    queryKey: ['recent-orders'],
    queryFn: getRecentOrders,
    staleTime: Infinity,
  });

  return (
    <div>
      <RecentOrdersHeader isLoading={isLoading} />
      <RecentOrdersContent />
    </div>
  );
};

export default RecentOrders;

function RecentOrdersHeader({ isLoading }: { isLoading: boolean }) {
  function Spinner() {
    return (
      <span className='ml-3'>
        <PiSpinnerGapThin className='text-xl animate-spin' />
      </span>
    );
  }

  return (
    <h2 className='flex items-center mb-6'>
      Recent Orders {isLoading && <Spinner />}
    </h2>
  );
}

function RecentOrdersContent() {
  const [expanded, setExpanded] = useState<OrderType | null>();

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<OrderType[]>({
    queryKey: ['recent-orders'],
    queryFn: getRecentOrders,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <RecentOrdersSkeleton />;
  }
  function RecentOrdersSkeleton() {
    return (
      <div className='w-4/5 flex flex-col gap-6'>
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className={`
              h-10 rounded-lg animate-pulse 
              even:bg-light-secondary/80 
              odd:bg-light-tertiary/50 odd:mr-28 
            `}
          ></div>
        ))}
      </div>
    );
  }

  if (error && error instanceof Error) {
    return <div>{error.message}</div>;
  }

  if (orders && orders.length === 0) {
    return <p>No recent orders</p>;
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
}
