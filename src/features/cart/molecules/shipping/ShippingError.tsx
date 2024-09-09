import { Container } from '@/shared/components/ui';
import { WarningIcon } from '@/shared/utils/ui';

export const ShippingError = () => {
  return (
    <Container
      as='div'
      flex='row'
      rounded='sm'
      padding='md'
      className='items-start bg-slate-50'
    >
      <WarningIcon className='text-red-600 text-2xl mt-1' />
      <Container as='p' className='italic'>
        There was an issue getting your shipping details
      </Container>
    </Container>
  );
};
