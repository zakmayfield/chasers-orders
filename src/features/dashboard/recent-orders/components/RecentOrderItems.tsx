import { FC } from 'react';
import { LineItemProducts } from '@/services/queries/orders.fetchLineItemsFromOrderId';

interface RecentOrderItemsProps {
  order: LineItemProducts | undefined;
}

// TODO: add the `size` to UI, will need to change data a bit

export const RecentOrderItems: FC<RecentOrderItemsProps> = ({ order }) => {
  return (
    <div>
      {order &&
        order.lineItems.map(({ id, quantity, unit: { product } }) => {
          return (
            <div className='grid grid-cols-10 mb-6 w-full' key={id}>
              <span className='col-span-1 text-sm w-full text-center text-gray-600 mr-3 font-normal underline'>
                x{quantity}
              </span>

              <span className='col-start-2 col-span-full w-full'>
                {product.name}
              </span>

              <span className='row-start-2 col-start-2 w-full text-sm italic text-gray-600 lowercase'>
                {product.category}
              </span>

              <div
                aria-label='style div'
                className='h-1 w-2/3 mx-auto mt-3 rounded row-start-3 col-span-full bg-light-secondary'
              ></div>
            </div>
          );
        })}
    </div>
  );
};
