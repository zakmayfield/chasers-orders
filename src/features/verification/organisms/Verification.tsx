import { useSearchParams } from 'next/navigation';
import { Container } from '@/shared/components/ui';
import { VerificationQueryLoading } from '../molecules/VerificationQueryLoading';
import { VerificationMutationLoading } from '../molecules/VerificationMutationLoading';
import { VerificationError } from '../molecules/VerificationError';
import { VerificationData } from '../molecules/VerificationData';
import {
  useGetUserAuthorization,
  useUpdateVerification,
} from '@/shared/hooks/data/user/useUser';

export const Verification = () => {
  const token = useSearchParams().get('token') ?? undefined;

  const authz = useGetUserAuthorization();
  const mutation = useUpdateVerification({
    token,
    authz: authz.data,
  });

  // Loading
  const queryLoading = authz.isLoading && <VerificationQueryLoading />;
  const mutationLoading = mutation.isLoading && <VerificationMutationLoading />;
  // Error
  const errorData = mutation.error && (
    <VerificationError errorMessage={mutation.error.message} />
  );
  // Data
  const data = (mutation.data || (authz && authz.data?.email_verified_on)) && (
    <VerificationData data={mutation.data} authorization={authz.data} />
  );

  return (
    <Container as='div' className='bg-slate-50' padding='lg' rounded='sm'>
      {queryLoading}
      {mutationLoading}
      {errorData}
      {data}
    </Container>
  );
};
