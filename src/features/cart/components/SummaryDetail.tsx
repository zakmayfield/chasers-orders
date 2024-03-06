'use client';

import { getCart } from '@/services/queries/cart.getCart';
import {
  CartCache,
  UnitsOnCartCacheType,
} from '@/features/cart/types/types.cart';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CiShop } from 'react-icons/ci';

export const SummaryDetails = () => {
  const { data, isFetching } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return (
    <div className='col-span-3'>
      <h2 className='mb-6 font-light text-xl'>Order Summary</h2>
      {/* Summary Items Container */}
      {/* No Cart Items */}
      {data && data.items.length === 0 && (
        <div className='font-extralight'>
          <p className='flex items-center'>
            Visit the{' '}
            <Link href='/products' className='underline flex items-center px-1'>
              <CiShop />
              shop
            </Link>{' '}
            to get started
          </p>
        </div>
      )}

      {/* Data with items */}
      <div className=' border-b pb-6'>
        {isFetching && !data ? (
          // Placeholder Loading Items
          <div>
            {[1, 2].map((placeholder) => (
              <LoadingDetail key={placeholder} />
            ))}
          </div>
        ) : (
          // Summary Items
          <div>
            {data?.items.map((item) => (
              <Detail key={item.unitId} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function LoadingDetail() {
  return (
    <div className='flex flex-col gap-1 mt-4 border-slate-200 bg-slate-50 rounded-lg p-3  last-of-type:border-none'>
      <div className='flex gap-3 text-sm'>
        <span className='text-gray-500 bg-slate-100 h-3 w-6 rounded animate-pulse'></span>
        <span className='bg-slate-200 h-3 w-6 rounded animate-pulse'></span>
        <span className='text-gray-500 bg-slate-100 h-3 w-6 rounded animate-pulse'></span>
      </div>

      <span className='text-sm font-semibold w-full bg-slate-200 h-5 rounded animate-pulse'></span>
    </div>
  );
}

function Detail({ item }: { item?: UnitsOnCartCacheType }) {
  const unit = item?.unit;
  const quantity = item?.quantity;
  const product = unit?.product;

  return (
    <div className='flex flex-col gap-1 mt-4 bg-slate-50 rounded-lg p-3 last-of-type:border-none'>
      <div className='flex gap-3 text-sm'>
        <span className='text-gray-500'>x{quantity}</span>
        <span className='font-extralight'>{unit?.size}</span>
        <span className='text-gray-500'>{product?.category.toLowerCase()}</span>
      </div>

      <span className='text-md font-extralight'>{product?.name}</span>
    </div>
  );
}
