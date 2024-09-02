'use client';
import { ContentTemplate } from '@/shared/components/ui';
import { AccountStatus } from '../organisms/AccountStatus';
import { AccountInformation } from '../organisms/AccountInformation';
import { PasswordChange } from '../organisms/PasswordChange';

export const AccountTemplate = () => {
  return (
    <ContentTemplate title='Account' headingClassname='mb-3'>
      <AccountStatus />
      <AccountInformation />
      <PasswordChange />
    </ContentTemplate>
  );
};
