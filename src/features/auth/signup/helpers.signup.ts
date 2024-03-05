import { SignUpFormData } from '@/types/types.auth-forms';
import { useQueryClient } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export const getQueryClient = () => {
  const queryClient = useQueryClient();
  return { queryClient };
};

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

type Key =
  | 'email'
  | 'password'
  | 'contactName'
  | 'contactPhoneNumber'
  | 'companyName'
  | 'accountPayableEmail'
  | 'paymentMethod'
  | 'shippingStreetAddress'
  | 'shippingCity'
  | 'shippingState'
  | 'shippingPostalCode'
  | 'billingStreetAddress'
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
    const formValues = getValues();

    setIsChecked(event.target.checked);

    if (event.target.checked) {
      setValue('billingStreetAddress', formValues.shippingStreetAddress);
      setValue('billingUnit', formValues.shippingUnit);
      setValue('billingCity', formValues.shippingCity);
      setValue('billingState', formValues.shippingState);
      setValue('billingPostalCode', formValues.shippingPostalCode);
    } else {
      setValue('billingStreetAddress', '');
      setValue('billingUnit', '');
      setValue('billingCity', '');
      setValue('billingState', '');
      setValue('billingPostalCode', '');
    }
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
