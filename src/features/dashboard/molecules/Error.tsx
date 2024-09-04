import { Container, Icon } from '@/shared/components/ui';
import { WarningTriangleDuotone } from '@/shared/utils/ui';

export const Error = ({ message }: { message: string }) => {
  return (
    <Container
      as='div'
      flex='row'
      rounded='sm'
      padding='sm'
      width='sm'
      className='bg-red-50'
    >
      <Icon
        IconData={WarningTriangleDuotone}
        iconClass='text-yellow-500 text-xl'
      />
      <Container as='p'>{message}</Container>
    </Container>
  );
};
