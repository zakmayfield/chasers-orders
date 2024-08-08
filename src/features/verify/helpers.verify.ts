import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { sendVerificationEmail } from '@/services/queries/sendVerificationEmail';
import { SendEmailAPIResponse } from '@/types/email';

//^ Send Verification Email

interface IUseSendVerificationEmail {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: (data: SendEmailAPIResponse) => void;
    onErrorCallback?: (error: Error) => void;
  }): {
    send: UseMutateFunction<SendEmailAPIResponse, Error, void, unknown>;
    data: SendEmailAPIResponse | undefined;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
  };
}

export const useSendVerificationEmail: IUseSendVerificationEmail = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const {
    mutate: send,
    data,
    isError,
    isSuccess,
    error,
  } = useMutation<SendEmailAPIResponse, Error, void, unknown>({
    mutationFn: sendVerificationEmail,
    onSuccess(data) {
      onSuccessCallback?.(data);
    },
    onError(error) {
      onErrorCallback?.(error);
    },
  });
  return {
    send,
    data,
    isError,
    isSuccess,
    error,
  };
};
