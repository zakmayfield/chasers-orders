import { z } from 'zod';
import { AuthSignUpValidator } from '../signup/validator/validator.signup';
import { AuthSignInValidator } from '../signin/validator/validator.signin';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import type { Steps } from '@/features/auth/signup/helpers.signup';

export type SignInFormData = z.infer<typeof AuthSignInValidator>;
export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;

//^ Step(s) Component Props
export interface StepProps {
  register: UseFormRegister<SignUpFormData>;
  getValues: UseFormGetValues<SignUpFormData>;
  handleStepChangeCallback(): void;
  errors: FieldErrors<SignUpFormData>;
  step: Steps;
}
