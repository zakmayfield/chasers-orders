import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { signIn } from 'next-auth/react';
import {
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import type { SignUpFormData } from '../types/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSignUpValidator } from './validator/validator.signup';

export type Steps = '1' | '2' | '3' | '4';

export const defaultValues = {
  email: '',
  password: '',
  contactName: '',
  contactPosition: '',
  contactPhoneNumber: '',
  companyName: '',
  accountPayableEmail: '',
  paymentMethod: '',
  shippingStreetAddress: '',
  shippingUnit: '',
  shippingCity: '',
  shippingState: '',
  shippingPostalCode: '',
  deliveryInstructions: '',
  billingStreetAddress: '',
  billingUnit: '',
  billingCity: '',
  billingState: '',
  billingPostalCode: '',
};

interface UseSignUpForm {
  (): {
    getValues: UseFormGetValues<SignUpFormData>;
    setValue: UseFormSetValue<SignUpFormData>;
    register: UseFormRegister<SignUpFormData>;
    handleSubmit: UseFormHandleSubmit<SignUpFormData>;
    formState: FormState<SignUpFormData>;
  };
}

export const useSignUpForm: UseSignUpForm = () => {
  const { formState, handleSubmit, register, getValues, setValue } =
    useForm<SignUpFormData>({
      resolver: zodResolver(AuthSignUpValidator),
      defaultValues,
    });

  return {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState,
  };
};

type Key =
  | 'email'
  | 'password'
  | 'contactName'
  | 'contactPhoneNumber'
  | 'companyName'
  | 'accountPayableEmail'
  | 'paymentMethod'
  | 'shippingStreetAddress'
  | 'shippingUnit'
  | 'shippingCity'
  | 'shippingState'
  | 'shippingPostalCode'
  | 'billingStreetAddress'
  | 'billingUnit'
  | 'billingCity'
  | 'billingState'
  | 'billingPostalCode';

interface IRequiredFields {
  [step: string]: Key[];
}

export const requiredStepFields: IRequiredFields = {
  '1': ['email', 'password'],
  '2': ['contactName', 'contactPhoneNumber'],
  '3': ['companyName', 'paymentMethod', 'accountPayableEmail'],
  '4': [
    'shippingStreetAddress',
    'shippingCity',
    'shippingState',
    'shippingPostalCode',
    'billingStreetAddress',
    'billingCity',
    'billingState',
    'billingPostalCode',
  ],
};

interface UseCheckedState {
  ({ getValues, setValue }: UseCheckedStateProps): {
    isChecked: boolean;
    handleCheckbox(event: ChangeEvent<HTMLInputElement>): void;
  };
}

type UseCheckedStateProps = {
  getValues: UseFormGetValues<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
};

export const useCheckedState: UseCheckedState = ({ getValues, setValue }) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    const formValues = getValues();

    setIsChecked(event.target.checked);

    const fields: { shipping: string; billing: Key }[] = [
      {
        shipping: formValues.shippingStreetAddress,
        billing: 'billingStreetAddress',
      },
      {
        shipping: formValues.shippingUnit,
        billing: 'billingUnit',
      },
      {
        shipping: formValues.shippingState,
        billing: 'billingState',
      },
      {
        shipping: formValues.shippingCity,
        billing: 'billingCity',
      },
      {
        shipping: formValues.shippingPostalCode,
        billing: 'billingPostalCode',
      },
    ];

    fields.forEach((field) =>
      checked
        ? setValue(field.billing, field.shipping)
        : setValue(field.billing, '')
    );
  }

  return { isChecked, handleCheckbox };
};

interface UseStepTracker {
  (): {
    step: Steps;
    setStep: Dispatch<SetStateAction<Steps>>;
  };
}

export const useStepTracker: UseStepTracker = () => {
  const [step, setStep] = useState<Steps>('1');
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setStep('1');
    }

    hasRun.current = true;
  }, []);

  return { step, setStep };
};

export const handleStepChange = ({
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

export const signUpWithCredentials = async (data: SignUpFormData) => {
  try {
    await signIn('sign-up', {
      ...data,
    });

    return {
      isSuccess: true,
    };
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
    };
  }
};
