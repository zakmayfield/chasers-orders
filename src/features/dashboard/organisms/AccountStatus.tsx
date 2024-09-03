import {
  Container,
  ContentTemplate,
  PulseLoader,
} from '@/shared/components/ui';
import { useGetUserAuthorization } from '@/shared/hooks/data/user/useUser';
import { StatusEmailVerification } from '../molecules/StatusEmailVerification';
import { StatusApproval } from '../molecules/StatusApproval';
import { Error } from '../molecules/Error';

export const AccountStatus = () => {
  const { data: status, isLoading, error } = useGetUserAuthorization();

  const loading = isLoading && <PulseLoader rows='multi' width='full' />;
  const errorData = error && error.message && <Error message={error.message} />;
  const data = status && !isLoading && (
    <Container as='div' flex='col'>
      <StatusEmailVerification status={status} />
      <StatusApproval status={status} />
    </Container>
  );

  return (
    <ContentTemplate title='Status' headingAs='h4'>
      <Container as='div' flex='col' paddingX='lg'>
        {loading}
        {errorData}
        {data}
      </Container>
    </ContentTemplate>
  );
};
