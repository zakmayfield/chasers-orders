'use client';

import { Verification } from '../organisms/Verification';
import { PageTemplate, Container } from '@/shared/components/ui';
import { useSession } from 'next-auth/react';

export const VerificationTemplate = () => {
  const { data: session } = useSession();
  return (
    <PageTemplate title='Verification' width='md' center={true}>
      <Container as='div'>
        <Verification email={session ? session.user.email! : undefined} />
      </Container>
    </PageTemplate>
  );
};
