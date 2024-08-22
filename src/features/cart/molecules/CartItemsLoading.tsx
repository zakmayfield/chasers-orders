import { Container, PulseLoader } from '@/shared/components/ui';

export const CartItemsLoading = () => {
  return (
    <Container as='div' flex='col'>
      <PulseLoader width='full' />
      <PulseLoader width='full' />
    </Container>
  );
};
