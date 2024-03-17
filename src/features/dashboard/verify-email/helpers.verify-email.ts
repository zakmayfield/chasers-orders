import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { sendVerificationEmail, verifyEmail } from './services.verify-email';
import { SendEmailAPIResponse } from './utils.verify-email';

interface IUseValidateVerificationToken {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: (data: string) => void;
    onErrorCallback?: (error: Error) => void;
  }): UseValidateVerificationTokenPayload;
}

type UseValidateVerificationTokenPayload = {
  validateToken: ValidateTokenMutation;
  isSuccess: boolean;
  data: string | undefined;
  isError: boolean;
  error: unknown;
};

type ValidateTokenMutation = UseMutateFunction<
  ValidateTokenData,
  unknown,
  ValidateTokenProps,
  unknown
>;

type ValidateTokenData = string;
type ValidateTokenProps = {
  token: string;
};

export const useValidateVerificationToken: IUseValidateVerificationToken = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const {
    mutate: validateToken,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: verifyEmail,
    onSuccess(data) {
      onSuccessCallback?.(data);
    },
    onError(error) {
      if (error instanceof Error) {
        onErrorCallback?.(error);
      }
    },
  });

  return { validateToken, isSuccess, isError, error, data };
};

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
