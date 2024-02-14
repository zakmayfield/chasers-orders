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
    <div className='flex items-center justify-between pb-4 mt-4 text-sm border-b'>
      <span className='w-full max-w-[250px]'>{product.name}</span>

      <div className='w-full max-w-[90px] flex items-center justify-between gap-3'>
        <span>{unit.size}</span>
        <span>x{quantity}</span>
      </div>
    </div>
  );
}

export default SummaryDetails;
