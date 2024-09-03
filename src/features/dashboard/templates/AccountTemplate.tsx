'use client';
import { Container, ContentTemplate } from '@/shared/components/ui';
import { AccountStatus } from '../organisms/AccountStatus';
import { AccountInformation } from '../organisms/AccountInformation';
import { PasswordChange } from '../organisms/PasswordChange';

export const AccountTemplate = () => {
  return (
    <ContentTemplate title='Account' headingClassname='mb-3'>
      <Container as='div' flex='col' paddingX='lg' gap='lg'>
        <AccountStatus />
        <AccountInformation />
        <PasswordChange />
      </Container>
    </ContentTemplate>
  );
};
