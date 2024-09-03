import { Container, Icon } from '@/shared/components/ui';
import { WarningTriangleDuotone } from '@/shared/utils/ui';

export const StatusError = ({ message }: { message: string }) => {
  return (
    <Container
      as='div'
      flex='row'
      rounded='sm'
      padding='sm'
      width='sm'
      className='bg-red-50'
    >
      <Icon IconData={WarningTriangleDuotone} iconClass='text-yellow-500' />
      <Container as='p'>{message}</Container>
    </Container>
  );
};
