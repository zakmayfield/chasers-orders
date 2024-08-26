'use client';
import { merge } from '@/shared/utils/ui';
import { FC } from 'react';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation } from '@/shared/hooks/custom';
import { sendVerificationEmail } from '@/services/queries/sendVerificationEmail';
import { SendVerificationEmailResponse } from '@/types/email';

interface SendVerificationEmailProps {
  className?: string;
}

export const SendVerificationEmail: FC<SendVerificationEmailProps> = ({
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
