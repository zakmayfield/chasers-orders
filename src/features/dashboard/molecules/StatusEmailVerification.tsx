import { Container, Heading, Icon } from '@/shared/components/ui';
import { TUserExtendedAuthorization } from '@/shared/types/User';
import { CheckCircleDuotone, XCircleDuotone } from '@/shared/utils/ui';

export const StatusEmailVerification = ({
  status,
}: {
  status: TUserExtendedAuthorization;
}) => {
  return (
    <Container as='div' flex='col' className='gap-1'>
      <Heading as='h6' content='Email verification:' />
      <Container as='div' flex='row'>
        {status.email_verified_on ? (
          <Icon IconData={CheckCircleDuotone} iconClass='text-green-500' />
        ) : (
          <Icon IconData={XCircleDuotone} iconClass='text-red-500' />
        )}
        <Container as='p'>{status.email}</Container>
      </Container>
    </Container>
  );
};
