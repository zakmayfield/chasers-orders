import { useSearchParams } from 'next/navigation';
import { Container } from '@/shared/components/ui';
import { useGetAuthorization } from '@/shared/hooks/data';
import { useUpdateUserVerification } from '@/shared/hooks/mutations';
import { VerificationQueryLoading } from '../molecules/VerificationQueryLoading';
import { VerificationMutationLoading } from '../molecules/VerificationMutationLoading';
import { VerificationError } from '../molecules/VerificationError';
import { VerificationData } from '../molecules/VerificationData';

export const Verification = () => {
  const token = useSearchParams().get('token') ?? undefined;

  const authorization = useGetAuthorization();
  const mutation = useUpdateUserVerification({
    token,
    authorization: authorization.data,
  });

  // Loading
  const queryLoading = authorization.isLoading && <VerificationQueryLoading />;
  const mutationLoading = mutation.isLoading && <VerificationMutationLoading />;
  // Error
  const error = mutation.error && (
    <VerificationError errorMessage={mutation.error.message} />
  );
  // Data
  const data = (mutation.data ||
    (authorization && authorization.data?.emailVerified)) && (
    <VerificationData data={mutation.data} authorization={authorization.data} />
  );

  return (
    <Container as='div' className='bg-slate-50' padding='lg' rounded='sm'>
      {queryLoading}
      {mutationLoading}
      {error}
      {data}
    </Container>
  );
};
