import { useEffect, useRef } from 'react';
import { useToast } from '../utils';
import { useQueryClient } from '@tanstack/react-query';
import { useCustomMutation } from '../custom';
import { updateUserVerification } from '@/services/mutations/updateUserVerification';
import { QueryKeys } from '@/shared/types/Cache';
import { TUserAuthorization } from '@/shared/types/User';

export const useUpdateUserVerification = ({
  token,
  authorization,
}: {
  token: string | undefined;
  authorization: TUserAuthorization | undefined;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate, error, isLoading, isError, isSuccess, data } =
    useCustomMutation({
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
    if (!hasRun.current && authorization && !authorization.email_verified_on) {
      mutate({ token });

      hasRun.current = true;
    }
  }, [token, mutate, authorization]);

  return { data, error, isLoading, isError, isSuccess };
};
