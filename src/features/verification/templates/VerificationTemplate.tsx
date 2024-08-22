'use client';
import { PageTemplate, Container } from '@/shared/components/ui';
import { Verification } from '../organisms/Verification';

export const VerificationTemplate = () => {
  return (
    <PageTemplate title='Verification' width='md' center={true}>
      <Container as='div'>
        <Verification />
      </Container>
    </PageTemplate>
  );
};
