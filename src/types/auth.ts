import { SignUpFormData } from '@/shared/validators/auth';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export type Steps = '1' | '2' | '3' | '4';

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
