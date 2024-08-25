import { Btn, Container, Heading } from '@/shared/components/ui';
import { FormState } from 'react-hook-form';

export const ShippingDeliveryInstructionsHeading = ({
  submit,
  cancel,
  toggleEdit,
  isEdit,
  formState,
}: {
  submit: () => Promise<void>;
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
    <Container as='div' flex='row' className='justify-between'>
      <Heading as='h6' content='Special Instructions' />

      <Container as='div' flex='row'>
        {toRead}
        {toSave}
        {toCancel}
      </Container>
    </Container>
  );
};
