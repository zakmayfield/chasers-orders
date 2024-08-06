import { Dispatch, FC, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ImSpinner2 } from 'react-icons/im';
import {
  handleStepChange,
  handlePrevousStepChange,
  useSignUpForm,
} from '@/features/auth/signup/helpers.signup';
import { StepOne, StepTwo, StepThree, StepFour } from './steps';
import type { SignUpFormData } from '@/shared/validators/auth';
import { Steps } from '@/types/auth';
import { handleSignUp } from '@/utils/helpers';

interface SignUpFormProps {
  setStep: Dispatch<SetStateAction<Steps>>;
  step: Steps;
}

export const SignUpForm: FC<SignUpFormProps> = ({ setStep, step }) => {
  const queryClient = useQueryClient();

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useSignUpForm();

  function handleStepChangeCallback() {
    handleStepChange({ step, setStep });
  }
  function handlePreviousStepCallback() {
    handlePrevousStepChange({ step, setStep });
  }

  async function signupCallback(data: SignUpFormData) {
    const accountPayable = data.accountPayableEmail;

    if (!accountPayable || accountPayable === '') {
      setValue('accountPayableEmail', 'N/A');
    }

    const values = getValues();

    const { isSuccess } = await handleSignUp(values);

    if (isSuccess) {
      queryClient.removeQueries(['form-values']);
    }
  }

  return (
    <form onSubmit={handleSubmit(signupCallback)}>
      {!step && (
        <div className='w-full flex justify-center items-center'>
          <ImSpinner2 className='animate-spin' />
        </div>
      )}

      <div className='flex flex-col gap-24'>
        {/*//^ STEP ONE */}
        {step === '1' && (
          <StepOne
            register={register}
            getValues={getValues}
            handleStepChangeCallback={handleStepChangeCallback}
            errors={errors}
            step={step}
          />
        )}

        {/*//^ STEP TWO */}
        {step === '2' && (
          <StepTwo
            register={register}
            getValues={getValues}
            handleStepChangeCallback={handleStepChangeCallback}
            handlePreviousStepCallback={handlePreviousStepCallback}
            errors={errors}
            step={step}
          />
        )}

        {/*//^ STEP THREE */}
        {step === '3' && (
          <StepThree
            register={register}
            getValues={getValues}
            handleStepChangeCallback={handleStepChangeCallback}
            handlePreviousStepCallback={handlePreviousStepCallback}
            errors={errors}
            step={step}
          />
        )}

        {/*//^ STEP FOUR */}
        {step === '4' && (
          <StepFour
            register={register}
            getValues={getValues}
            setValue={setValue}
            handlePreviousStepCallback={handlePreviousStepCallback}
            step={step}
            errors={errors}
            isSubmitted={isSubmitted}
            isSubmitSuccessful={isSubmitSuccessful}
          />
        )}
      </div>
    </form>
  );
};
