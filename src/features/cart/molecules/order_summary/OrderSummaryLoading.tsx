import { usePulseLoader } from '@/shared/components/loading';

export const OrderSummaryLoading = () => {
  const { PulseLoader } = usePulseLoader({ size: 'md', width: 'full' });
  return <PulseLoader />;
};
