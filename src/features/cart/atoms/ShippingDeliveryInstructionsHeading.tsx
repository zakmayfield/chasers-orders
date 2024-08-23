import { Button, Container, Heading } from '@/shared/components/ui';
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
    <Button
      handleClick={toggleEdit}
      text='edit'
      bg='translucent'
      className='p-1 px-2'
    />
  );

  const toSave = isEdit && formState.isDirty && (
    <Button handleClick={submit} text='save' className='p-1 px-2' />
  );

  const toCancel = isEdit && (
    <Button handleClick={cancel} text='X' className='p-1 px-2 bg-red-400' />
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
