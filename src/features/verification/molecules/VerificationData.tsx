import { Container, Heading } from '@/shared/components/ui';
import { UpdateUserVerificationResponse } from '@/types/verification';
import { CheckIcon } from '@/utils/icons';

export const VerificationData = ({
  data,
}: {
  data: UpdateUserVerificationResponse;
}) => {
  return (
    <Container as='div' flex='col'>
      <Heading as='h5' content='Email Verification Successful' />

      <Container as='div' flex='row' className='items-center'>
        <Container as='span'>
          <CheckIcon className='text-green-500 text-xl' />
        </Container>
        <Container as='span'>{data.email}</Container>
      </Container>
    </Container>
  );
};
