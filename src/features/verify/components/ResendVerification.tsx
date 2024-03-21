import { merge } from '@/utils/styles.utils';
import { FC } from 'react';
import { useSendVerificationEmail } from '../helpers.verify';
import { useToast } from '@/hooks/general.hooks';

interface ResendVerificationProps {
  className?: string;
}

export const ResendVerification: FC<ResendVerificationProps> = ({
  className,
}) => {
  const { notify } = useToast();
  const { send } = useSendVerificationEmail({
    onSuccessCallback(data) {
      notify(data.responseMessage);
    },
    onErrorCallback(error) {
      notify(error.message, 'error');
    },
  });

  return (
    <div className={merge(`flex items-center gap-6 ${className}`)}>
      <button
        className='text-sm text-purple-700 underline'
        // TODO: configure the proper guard for anti abuse
        onClick={() => send()}
      >
        Need a new verification email?
      </button>
    </div>
  );
};
