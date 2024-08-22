'use client';
import { PageTemplate, Container } from '@/shared/components/ui';
import { V } from '../organisms/V';

export const VerificationTemplate = () => {
  return (
    <PageTemplate title='Verification' width='md' center={true}>
      <Container as='div'>
        <V />
      </Container>
    </PageTemplate>
  );
};
