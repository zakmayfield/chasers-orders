import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSignUpValidator, SignUpFormData } from '@/shared/validators/auth';
import { Steps } from '@/types/auth';

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
    reset: UseFormReset<SignUpFormData>;
  };
}

export const useSignUpForm: UseSignUpForm = () => {
  // TODO: remvove 'reset' when done with 'shortcut' button
  const { formState, handleSubmit, register, getValues, setValue, reset } =
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
    reset,
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
  '3': ['companyName', 'paymentMethod'],
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

interface UseBillingAddressSync {
  ({ getValues, setValue }: UseBillingAddressSyncProps): {
    isChecked: boolean;
    handleCheckbox(event: ChangeEvent<HTMLInputElement>): void;
  };
}

type UseBillingAddressSyncProps = {
  getValues: UseFormGetValues<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
};

export const useBillingAddressSync: UseBillingAddressSync = ({
  getValues,
  setValue,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const checked: boolean = event.target.checked;
    const formValues: SignUpFormData = getValues();

    setIsChecked(checked);

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

export const handlePrevousStepChange = ({
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
