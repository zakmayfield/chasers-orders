import { Container } from '@/shared/components/ui';
import { WarningIcon } from '@/shared/utils/ui';

export const OrderSummaryError = () => {
  return (
    <Container as='div' flex='row'>
      <WarningIcon className='text-red-600' />
      <Container as='p'>There was an issue getting your cart</Container>
    </Container>
  );
};
