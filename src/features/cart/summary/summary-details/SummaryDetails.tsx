'use client';

import Link from 'next/link';
import { useGetCart } from '@/shared/hooks/queries';
import { ShopIcon } from '@/utils/icons';
import { CartItem } from '@/types/cart';

export const SummaryDetails = () => {
  const { data, isFetching } = useGetCart();

  return (
    <div className='col-span-3 min-h-[164px] mb-3'>
      {/* Summary Items Container */}
      {/* No Cart Items */}
      {data && data.items.length === 0 && (
        <div className='font-extralight h-full bg-light-primary rounded-lg'>
          <p className='flex items-center h-full justify-center'>
            Visit the{' '}
            <Link href='/products' className='underline flex items-center px-1'>
              <ShopIcon />
              shop
            </Link>{' '}
            to get started
          </p>
        </div>
      )}

      {/* Data with items */}
      {isFetching && !data ? (
        // Placeholder Loading Items
        <div className='flex flex-col gap-3'>
          {[1, 2].map((placeholder) => (
            <LoadingDetail key={placeholder} />
          ))}
        </div>
      ) : (
        // Summary Items
        <div className='flex flex-col gap-3'>
          {data?.items.map((item) => <Detail key={item.unitId} item={item} />)}
        </div>
      )}
    </div>
  );
};

function LoadingDetail() {
  return (
    <div className='flex flex-col justify-center gap-1 h-[76px] border-slate-200 bg-slate-50 rounded-lg p-3 last-of-type:border-none'>
      <div className='flex gap-3 text-sm'>
        <span className='text-gray-500 bg-slate-100 h-3 w-6 rounded animate-pulse'></span>
        <span className='bg-slate-200 h-3 w-6 rounded animate-pulse'></span>
        <span className='text-gray-500 bg-slate-100 h-3 w-6 rounded animate-pulse'></span>
      </div>

      <span className='text-sm font-semibold w-full bg-slate-200 h-5 rounded animate-pulse'></span>
    </div>
  );
}

function Detail({ item }: { item?: CartItem }) {
  const unit = item?.unit;
  const quantity = item?.quantity;
  const product = unit?.product;

  return (
    <div className='flex flex-col bg-slate-50 rounded-lg p-3 last-of-type:border-none'>
      <div className='flex gap-3 text-sm'>
        <span className='text-gray-500'>x{quantity}</span>
        <span className='font-extralight'>{unit?.size}</span>
        <span className='text-gray-500'>{product?.category.toLowerCase()}</span>
      </div>

      <span className='text-md font-extralight'>{product?.name}</span>
    </div>
  );
}
