import { Container } from '@/shared/components/ui';
import { EmptyCartIcon } from '@/utils/icons';

export const OrderSummaryEmpty = () => {
  return (
    <Container
      as='div'
      flex='row'
      padding='md'
      rounded='sm'
      flexCenter={true}
      className='bg-slate-50'
    >
      <Container as='div' flex='col'>
        <Container as='div' flex='row' className='items-center'>
          <EmptyCartIcon />
          <Container as='span'>(0)</Container>
        </Container>
      </Container>
    </Container>
  );
};
