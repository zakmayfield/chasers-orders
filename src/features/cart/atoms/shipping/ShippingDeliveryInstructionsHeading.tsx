import { ContentWrapper } from '@/shared/components/containers';
import { Btn, Heading } from '@/shared/components/ui';
import { FormState } from 'react-hook-form';

export const ShippingDeliveryInstructionsHeading = ({
  submit,
  cancel,
  toggleEdit,
  isEdit,
  formState,
}: {
  submit: () => void;
  cancel: () => void;
  toggleEdit: () => void;
  isEdit: boolean;
  formState: FormState<{
    deliveryInstructions: string;
  }>;
}) => {
  const toRead = !isEdit && (
    <Btn handleClick={toggleEdit} text='edit' border={true} height='sm' />
  );

  const toSave = isEdit && formState.isDirty && (
    <Btn handleClick={submit} text='save' bgColor='green' height='sm' />
  );

  const toCancel = isEdit && (
    <Btn handleClick={cancel} text='X' bgColor='red' height='sm' />
  );

  return (
    <ContentWrapper flex='row' className='justify-between'>
      <Heading as='h6' content='Special Instructions' />

      <ContentWrapper flex='row'>
        {toRead}
        {toSave}
        {toCancel}
      </ContentWrapper>
    </ContentWrapper>
  );
};
