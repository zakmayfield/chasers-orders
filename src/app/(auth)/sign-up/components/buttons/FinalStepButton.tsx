import { FC } from 'react';
import { Btn } from '@/shared/components/ui';

interface FinalStepButtonProps {
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
}

export const FinalStepButton: FC<FinalStepButtonProps> = ({
  isSubmitted,
  isSubmitSuccessful,
}) => {
  return (
    <Btn
      text='Create Account'
      type='submit'
      bgColor='green'
      width='full'
      height='lg'
      isDisabled={isSubmitted && isSubmitSuccessful}
      isLoading={isSubmitted && isSubmitSuccessful}
    />
  );
};
