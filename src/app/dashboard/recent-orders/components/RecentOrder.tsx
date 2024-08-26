import { getLineItems } from '@/services/queries/getLineItems';
import OrderAgainButton from './OrderAgainButton';
import { RecentOrderItems } from './RecentOrderItems';
import { OrderType } from '@/types/cart';
import { useCustomQuery } from '@/shared/hooks/custom';
import { QueryKeys } from '@/types/hooks';
import { Heading, SpinLoader } from '@/shared/components/ui';
import { WarningIcon } from '@/shared/utils/ui';

export const RecentOrder = ({ order }: { order: OrderType }) => {
  const { data, isLoading, isError } = useCustomQuery({
    queryKey: [QueryKeys.ORDER, order.id],
    queryFn: async () => await getLineItems(order.id),
    staleTime: Infinity,
  });

  const createdAtDate = new Date(order.createdAt).toDateString();

  if (isError) {
    return (
      <div>
        <p className='flex items-center gap-3'>
          <WarningIcon className='text-yellow-500' />
          <span className='text-sm'>Could not locate order</span>
        </p>
      </div>
    );
  }

  return (
    <div key={order.id} className=''>
      <div className='mb-2 w-full flex items-center gap-3 '>
        <Heading as='h5' content={createdAtDate} />
        <OrderAgainButton order={order} />
      </div>

      <div className='px-6 py-3'>
        {isLoading ? <SpinLoader /> : <RecentOrderItems order={data} />}
      </div>
    </div>
  );
};
