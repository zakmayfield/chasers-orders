import { SignUpFormData } from '@/shared/validators/auth';
import { Key } from '@/utils/constants';
import { ChangeEvent, useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

type UseSyncBillingAddressProps = {
  getValues: UseFormGetValues<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
};

export const useSyncBillingAddress = ({
  getValues,
  setValue,
}: UseSyncBillingAddressProps) => {
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
