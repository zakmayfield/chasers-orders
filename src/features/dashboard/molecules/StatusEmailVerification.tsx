import { Container, Heading, Icon } from '@/shared/components/ui';
import { TUserExtendedAuthorization } from '@/shared/types/User';
import { CheckCircleDuotone, XCircleDuotone } from '@/shared/utils/ui';

export const StatusEmailVerification = ({
  status,
}: {
  status: TUserExtendedAuthorization;
}) => {
  return (
    <Container as='div' flex='col' gap='sm' className='border-b'>
      <Heading as='h5' content='Email verification:' />
      <Container as='div' flex='row' paddingX='lg'>
        {status.email_verified_on ? (
          <Icon
            IconData={CheckCircleDuotone}
            iconClass='text-green-500'
            width='xs'
          />
        ) : (
          <Icon IconData={XCircleDuotone} iconClass='text-red-500' width='xs' />
        )}
        <Container as='p' className='italic text-gray-600'>
          {status.email}
        </Container>
      </Container>
    </Container>
  );
};
