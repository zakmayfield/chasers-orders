import { merge } from '@/utils/styles.utils';
import { FC } from 'react';

interface ResendVerificationProps {
  className?: string;
}

export const ResendVerification: FC<ResendVerificationProps> = ({
  className,
}) => {
  return (
    <div className={merge(` ${className}`)}>
      RESEND
      {/* <button onClick={() => send()}>manually send email</button> */}
      {/* {isSendEmailError && sendEmailError && <p>{sendEmailError.message}</p>}
      {isSendEmailSuccess && sendEmailData && (
        <p>{sendEmailData.responseMessage}</p>
      )} */}
    </div>
  );
};
