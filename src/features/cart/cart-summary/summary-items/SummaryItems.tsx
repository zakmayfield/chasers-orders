'use client';

import { useGetCart } from '@/shared/hooks/data';
import { LoadingSummary, EmptySummary, SummaryItem } from './components';

export const SummaryItems = () => {
  const { data, isFetching } = useGetCart();

  return (
    <div className='col-span-3 min-h-[164px] mb-3'>
      {isFetching ? (
        <LoadingSummary />
      ) : !data?.items.length ? (
        <EmptySummary />
      ) : (
        <div className='flex flex-col gap-3'>
          {data?.items.map((item) => (
            <SummaryItem key={item.unitId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
