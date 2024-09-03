import { Container, ContentTemplate, Heading } from '@/shared/components/ui';
import { ChangePasswordForm } from '../molecules/ChangePasswordForm';

export const PasswordChange = () => {
  return (
    <ContentTemplate title='Change Password' headingAs='h4'>
      <Container as='div' flex='col' paddingX='lg'>
        <Container as='div' flex='col'>
          <Heading as='h5' content='Password' />
          <ChangePasswordForm />
        </Container>
      </Container>
    </ContentTemplate>
  );
};
