import { z } from 'zod';
import { AuthSignInValidator, AuthSignUpValidator } from '@/shared/validators';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import type { Steps } from '@/features/auth/signup/helpers.signup';

//^ Validator Types
export type SignInFormData = z.infer<typeof AuthSignInValidator>;
export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;

//^ Step(1-3) Component Props
export interface StepProps {
  register: UseFormRegister<SignUpFormData>;
  getValues: UseFormGetValues<SignUpFormData>;
  handleStepChangeCallback?(): void;
  handlePreviousStepCallback?(): void;
  errors: FieldErrors<SignUpFormData>;
  step: Steps;
}

//^ Step(4) Component Props
export interface StepFourProps extends StepProps {
  setValue: UseFormSetValue<SignUpFormData>;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
}
