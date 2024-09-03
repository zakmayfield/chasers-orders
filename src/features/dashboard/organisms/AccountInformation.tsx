import {
  Container,
  ContentTemplate,
  Heading,
  PulseLoader,
} from '@/shared/components/ui';
import { useGetUser } from '@/shared/hooks/data/user/useUser';
import { Error } from '../molecules/Error';
import { InfoUser } from '../molecules/InfoUser';
import { InfoContact } from '../molecules/InfoContact';
import { InfoCompany } from '../molecules/InfoCompany';

export const AccountInformation = () => {
  const { data: user, isLoading, error } = useGetUser({ fullUser: true });

  const loading = isLoading && <PulseLoader rows='multi' />;
  const errorData = error && error.message && <Error message={error.message} />;
  const data = user && user.full && !isLoading && (
    <Container as='div' flex='col'>
      <InfoUser email={user.full.email} />
      {user.full.contact && <InfoContact contact={user.full.contact} />}
      {user.full.company && <InfoCompany company={user.full.company} />}
    </Container>
  );

  return (
    <ContentTemplate title='Information' headingAs='h4'>
      <Container as='div' flex='col' paddingX='lg'>
        {loading}
        {errorData}
        {data}
      </Container>
    </ContentTemplate>
  );
};
