import { useEffect, useRef } from 'react';
import { useToast } from '../utils';
import { useQueryClient } from '@tanstack/react-query';
import { useCustomMutation } from '../custom';
import { updateUserVerification } from '@/services/mutations/updateUserVerification';
import { QueryKeys } from '@/types/hooks';
import { UserAuthorization } from '@/types/user';
import {
  UpdateUserVerificationRequest,
  UpdateUserVerificationResponse,
} from '@/types/verification';

export const useUpdateUserVerification = ({
  token,
  authorization,
}: {
  token: string | undefined;
  authorization: UserAuthorization | undefined;
}) => {
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
      },
      handleError(error) {
        notify(error.message, 'error');
      },
    });

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && authorization && !authorization.emailVerified) {
      mutate({ token });

      hasRun.current = true;
    }
  }, [token, mutate, authorization]);

  return { data, error, isLoading, isError, isSuccess };
};
