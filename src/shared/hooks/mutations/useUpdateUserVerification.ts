import {
  UpdateUserVerificationRequest,
  UpdateUserVerificationResponse,
} from '@/types/verification';
import { useCustomMutation } from '../custom';
import { updateUserVerification } from '@/services/mutations/updateUserVerification';
import { useToast } from '../utils';
import { QueryKeys } from '@/types/hooks';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { UserAuthorization } from '@/types/user';

export const useUpdateUserVerification = ({
  token,
  authorization,
}: {
  token: string | undefined;
  authorization: UserAuthorization | undefined;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate, error, isLoading, isError, isSuccess, data } =
    useCustomMutation<
      UpdateUserVerificationResponse,
      UpdateUserVerificationRequest
    >({
      mutationFn: updateUserVerification,
      handleSuccess(data) {
        notify(`Email verification successful: ${data.email}`);

        queryClient.invalidateQueries([QueryKeys.USER_STATUS]);

        if (data.isApproved) {
          router.push('/products');
          return;
        }
        router.push('/dashboard/account-pending');
      },
      handleError(error) {
        notify(error.message, 'error');
      },
    });

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && authorization && authorization.emailVerified) {
      mutate({ token });

      hasRun.current = true;
    }
  }, [token, mutate, authorization]);

  return { data, error, isLoading, isError, isSuccess };
};
