'use client';

import { useGetCart } from '@/shared/hooks/queries';
import { LoadingSummary, EmptySummary, SummaryItemDetail } from './components';

export const SummaryDetails = () => {
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
            <SummaryItemDetail key={item.unitId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
