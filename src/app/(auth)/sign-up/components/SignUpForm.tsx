import { Dispatch, FC, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { StepOne, StepTwo, StepThree, StepFour } from './steps';
import { SignUpFormData, Steps } from '@/types/auth';
import { handleSignUp } from '@/utils/helpers';
import { useCustomForm } from '@/shared/hooks/custom';
import { defaultSignUpFormValues } from '@/utils/constants';
import { signUpResolver } from '@/shared/validators/resolvers';

interface SignUpFormProps {
  setStep: Dispatch<SetStateAction<Steps>>;
  step: Steps;
}

export const SignUpForm: FC<SignUpFormProps> = ({ setStep, step }) => {
  const queryClient = useQueryClient();

  const {
    methods: {
      getValues,
      setValue,
      register,
      handleSubmit,
      formState: { errors, isSubmitted, isSubmitSuccessful },
    },
  } = useCustomForm<SignUpFormData>({
    defaultValues: defaultSignUpFormValues,
    resolver: signUpResolver,
  });

  const incrementStep = ({
    step,
    setStep,
  }: {
    step: Steps;
    setStep: Dispatch<SetStateAction<Steps>>;
  }) => {
    let stepToNumber = Number(step);
    if (stepToNumber >= 4) {
      return;
    }

    const nextStep = (stepToNumber = stepToNumber + 1);

    setStep(nextStep.toString() as Steps);
  };

  function handleIncrementStep() {
    incrementStep({ step, setStep });
  }

  const decrementStep = ({
    step,
    setStep,
  }: {
    step: Steps;
    setStep: Dispatch<SetStateAction<Steps>>;
  }) => {
    let stepToNumber = Number(step);
    if (stepToNumber <= 1) {
      return;
    }

    const nextStep = (stepToNumber = stepToNumber - 1);

    setStep(nextStep.toString() as Steps);
  };

  function handleDecrementStep() {
    decrementStep({ step, setStep });
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
      <div className='flex flex-col gap-24'>
        {/*//^ STEP ONE */}
        {step === '1' && (
          <StepOne
            register={register}
            getValues={getValues}
            handleIncrementStep={handleIncrementStep}
            errors={errors}
            step={step}
          />
        )}

        {/*//^ STEP TWO */}
        {step === '2' && (
          <StepTwo
            register={register}
            getValues={getValues}
            handleIncrementStep={handleIncrementStep}
            handleDecrementStep={handleDecrementStep}
            errors={errors}
            step={step}
          />
        )}

        {/*//^ STEP THREE */}
        {step === '3' && (
          <StepThree
            register={register}
            getValues={getValues}
            handleIncrementStep={handleIncrementStep}
            handleDecrementStep={handleDecrementStep}
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
            handleDecrementStep={handleDecrementStep}
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
