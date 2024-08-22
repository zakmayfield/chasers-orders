import { Container, Heading } from '@/shared/components/ui';
import { UserAuthorization } from '@/types/user';
import { UpdateUserVerificationResponse } from '@/types/verification';
import { CheckIcon } from '@/utils/icons';
import { ReturnToDashboardButton } from '../atoms/ReturnToDashboardButton';

export const VerificationData = ({
  data,
  authorization,
}: {
  data: UpdateUserVerificationResponse | undefined;
  authorization: UserAuthorization | undefined;
}) => {
  return (
    <Container as='div' flex='col'>
      <Heading
        as='h5'
        content='Email Verification Successful'
        className='text-green-600'
      />

      <Container as='div' flex='row' className='items-center'>
        <Container as='span'>
          <CheckIcon className='text-green-500 text-xl' />
        </Container>
        <Container as='span'>
          {data?.email ? data.email : authorization?.email}
        </Container>
      </Container>

      <ReturnToDashboardButton />
    </Container>
  );
};
