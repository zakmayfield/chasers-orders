import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { sendVerificationEmail, verifyEmailWithToken } from './services.verify';
import { VerifyAPIResponse, VerifyMutation, VerifyMutationArgs } from './types';
import type { SendEmailAPIResponse } from './utils.verify';

//^ Verification

interface IUseVerify {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: ({ data }: { data: VerifyAPIResponse }) => void;
    onErrorCallback?: ({ error }: { error: Error }) => void;
  }): {
    verifyEmail: VerifyMutation;
    data: VerifyAPIResponse | undefined;
    error: Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
}

export const useVerify: IUseVerify = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  // ^ Mutate was not inferring the correct types for the longest time
  // ^ turns out i needed to define the types on the mutation generics first... and then set the interface...
  const {
    mutate: verifyEmail,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<VerifyAPIResponse, Error, VerifyMutationArgs, unknown>({
    mutationFn: verifyEmailWithToken,
    onSuccess(data) {
      onSuccessCallback?.({ data });
    },
    onError(error) {
      onErrorCallback?.({ error });
    },
  });

  return { verifyEmail, data, error, isLoading, isError, isSuccess };
};

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
