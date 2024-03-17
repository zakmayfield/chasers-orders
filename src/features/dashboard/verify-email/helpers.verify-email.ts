import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import {
  TokenValidatorResponse,
  TokenValidatorResponse2,
  sendVerificationEmail,
  tokenValidator,
} from './services.verify-email';
import { SendEmailAPIResponse } from './utils.verify-email';

interface IUseValidateVerificationToken {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: (data: TokenValidatorResponse2) => void;
    onErrorCallback?: (error: Error) => void;
  }): UseValidateVerificationTokenPayload;
}

type UseValidateVerificationTokenPayload = {
  validateToken: TokenValidatorMutation;
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
};

type TokenValidatorMutation = UseMutateFunction<
  TokenValidatorResponse2,
  unknown,
  TokenValidatorProps,
  unknown
>;

type TokenValidatorProps = {
  token: string;
};

// TODO: fix this type
export const useValidateVerificationToken: IUseValidateVerificationToken = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const {
    mutate: validateToken,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: tokenValidator,
    onSuccess(data) {
      onSuccessCallback?.(data);
    },
    onError(error) {
      if (error instanceof Error) {
        onErrorCallback?.(error);
      }
    },
  });

  return { validateToken, isSuccess, error, isLoading };
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
