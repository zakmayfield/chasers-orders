import { Container, Heading } from '@/shared/components/ui';

export const InfoUser = ({ email }: { email: string }) => {
  return (
    <Container as='div' flex='col'>
      <Heading as='h5' content='User' />
      <Container as='div' flex='col' paddingX='lg'>
        <Container as='div' flex='row' className='border-b'>
          <Container as='p' width='xs'>
            Email:
          </Container>{' '}
          <Container as='p' className='italic text-gray-600'>
            {email}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
