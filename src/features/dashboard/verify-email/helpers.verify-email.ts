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
  const { mutate: validateToken, isSuccess } = useMutation({
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

  return { validateToken, isSuccess };
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
  };
}

export const useSendVerificationEmail: IUseSendVerificationEmail = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const { mutate: send } = useMutation<
    SendEmailAPIResponse,
    Error,
    void,
    unknown
  >({
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
  };
};
