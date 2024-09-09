import { ContentWrapper } from '@/shared/components/containers';
import { usePulseLoader } from '@/shared/components/loading';

export const CartItemsLoading = () => {
  const { PulseLoader } = usePulseLoader({
    size: 'md',
    width: 'full',
  });

  return (
    <ContentWrapper>
      <PulseLoader />
    </ContentWrapper>
  );
};
