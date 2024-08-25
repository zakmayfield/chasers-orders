import { Container, Heading } from '@/shared/components/ui';

export const VerificationError = ({
  errorMessage,
}: {
  errorMessage: string;
}) => {
  return (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Error' className='text-red-500' />
      <Container as='p'>{errorMessage}</Container>
    </Container>
  );
};
