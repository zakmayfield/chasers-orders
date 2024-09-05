import { Container, ContentTemplate, Heading } from '@/shared/components/ui';
import { ChangePasswordForm } from '../molecules/ChangePasswordForm';

export const PasswordChange = () => {
  return (
    <ContentTemplate title='Password' headingAs='h4'>
      <Container as='div' flex='col' className='md:px-6'>
        <Container as='div' flex='col'>
          <Heading as='h5' content='Change Password' />
          <ChangePasswordForm />
        </Container>
      </Container>
    </ContentTemplate>
  );
};
