'use client';

import { useState } from 'react';
import { Order, OrderLineItem } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { getRecentOrders } from '@/services/queries/orders.getRecentOrders';
import {
  LineItemProducts,
  fetchLineItemsFromOrderId,
} from '@/services/queries/orders.fetchLineItemsFromOrderId';
import Link from 'next/link';

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

  // TODO: Create line item products endpoint - dont bug it out this time
  const RecentOrder = ({ order }: { order: OrderType }) => {
    const { data: orderWithLineItemProducts } =
      useQuery<LineItemProducts | null>({
        queryKey: ['line-item-products', order.id],
        queryFn: () => fetchLineItemsFromOrderId(order.id),
        staleTime: Infinity,
      });

    const createdAtDate = new Date(order.createdAt).toDateString();

    if (!orderWithLineItemProducts) {
      return <div>Could not locate order.</div>;
    }

    return (
      <div key={order.id}>
        <div className='mb-2 w-full flex items-center gap-3'>
          <h5>{createdAtDate}</h5>
          <Link href='#' className='underline text-purple-800 text-sm'>
            order again
          </Link>
        </div>

        <div className='px-6'>
          {orderWithLineItemProducts.lineItems.map(
            ({ quantity, unit: { product } }) => {
              return (
                <div className='flex items-center gap-6'>
                  <div>
                    <span className='text-sm text-gray-600 mr-3'>
                      x{quantity}
                    </span>
                    <span>{product.name}</span>
                  </div>
                  <span className='text-sm text-gray-600 lowercase'>
                    {product.category}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-12'>
      {orders &&
        orders.map((order) => <RecentOrder key={order.id} order={order} />)}
    </div>
  );
}
