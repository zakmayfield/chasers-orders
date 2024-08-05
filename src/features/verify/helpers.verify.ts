import { useState } from 'react';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import type {
  VerifyAPIResponse,
  VerifyMutation,
  VerifyMutationArgs,
} from '@/types/verification';
import type { SendEmailAPIResponse } from './utils.verify';
import { sendVerificationEmail } from '@/services/queries/sendVerificationEmail';
import { updateUserVerification } from '@/services/mutations/updateUserVerification';

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
    isRedirecting: boolean;
    userIsApproved: boolean | null;
  };
}

export const useVerify: IUseVerify = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userIsApproved, setUserIsApproved] = useState<boolean | null>(null);

  const {
    mutate: verifyEmail,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<VerifyAPIResponse, Error, VerifyMutationArgs, unknown>({
    mutationFn: updateUserVerification,
    onSuccess(data) {
      setUserIsApproved(data.isApproved);
      setIsRedirecting(true);

      onSuccessCallback?.({ data });
    },
    onError(error) {
      onErrorCallback?.({ error });
    },
  });

  return {
    verifyEmail,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    isRedirecting,
    userIsApproved,
  };
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
