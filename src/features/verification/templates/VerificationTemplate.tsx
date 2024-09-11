'use client';
import { Verification } from '../organisms/Verification';
import { Layout } from '@/shared/components/containers';

export const VerificationTemplate = () => {
  return (
    <Layout heading='h1' title='Verification' width='md'>
      <Verification />
    </Layout>
  );
};
