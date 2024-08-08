import { merge } from '@/utils/styles';
import { FC } from 'react';
import { useToast } from '@/shared/hooks';
import { useCustomMutation } from '@/shared/hooks/mutations';
import { sendVerificationEmail } from '@/services/queries/sendVerificationEmail';
import { SendVerificationEmailResponse } from '@/types/email';

interface ResendVerificationProps {
  className?: string;
}

export const ResendVerification: FC<ResendVerificationProps> = ({
  className,
}) => {
  const { notify } = useToast();
  const { mutate: sendEmail } = useCustomMutation<
    SendVerificationEmailResponse,
    void
  >({
    mutationFn: sendVerificationEmail,
    handleSuccess(data) {
      notify(data.responseMessage);
    },
    handleError(error) {
      notify(error.message, 'error');
    },
  });

  return (
    <div className={merge(`flex items-center gap-6 ${className}`)}>
      <button
        className={`border rounded-lg py-2 px-4`}
        onClick={() => sendEmail()}
      >
        Need a new verification email?
      </button>
    </div>
  );
};
