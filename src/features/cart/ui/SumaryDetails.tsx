'use client';

import { getCart } from '@/services/queries/cart.getCart';
import { CartCache, UnitsOnCartCacheType } from '@/types/types.cart';
import { useQuery } from '@tanstack/react-query';

const SummaryDetails = () => {
  const { data } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return (
    <div className='col-span-3 rounded-lg shadow-md px-3 py-6'>
      <h2 className='mb-6'>Summary</h2>
      {data &&
        data.items.length > 0 &&
        data.items.map((item) => <Detail key={item.unitId} item={item} />)}
    </div>
  );
};

function Detail({ item }: { item: UnitsOnCartCacheType }) {
  const { unit, quantity } = item;
  const { product } = unit;

  return (
    <div className='flex flex-col gap-1 pb-4 mt-4 border-b last-of-type:border-none'>
      <div className='flex gap-3 text-sm'>
        <span className='text-gray-500'>x{quantity}</span>
        <span>{unit.size}</span>
        <span className='text-gray-500'>{product.category.toLowerCase()}</span>
      </div>

      <span className='text-sm font-semibold'>{product.name}</span>
    </div>
  );
}

export default SummaryDetails;
