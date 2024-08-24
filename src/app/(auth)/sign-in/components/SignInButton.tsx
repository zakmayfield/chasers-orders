import { Btn } from '@/shared/components/ui';
import { FC } from 'react';

interface SignInButtonProps {
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
}

export const SignInButton: FC<SignInButtonProps> = ({
  isSubmitted,
  isSubmitSuccessful,
}) => {
  return (
    <Btn
      text='Sign In'
      width='full'
      bgColor='green'
      height='lg'
      isDisabled={isSubmitted && isSubmitSuccessful}
      isLoading={isSubmitted && isSubmitSuccessful}
    />
  );
};
