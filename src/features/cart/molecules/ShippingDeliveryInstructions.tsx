import { Container } from '@/shared/components/ui';
import { ShippingDeliveryInstructionsHeading } from '../atoms/ShippingDeliveryInstructionsHeading';
import { ShippingDeliveryInstructionsForm } from '../atoms/ShippingDeliveryInstructionsForm';
import { useDeliveryInstructionsForm } from '@/shared/hooks/utils';
import { ShippingDeliveryInstructionsContent } from '../atoms/ShippingDeliveryInstructionsContent';

export const ShippingDeliveryInstructions = ({
  deliveryInstructions,
}: {
  deliveryInstructions: string;
}) => {
  const {
    methods: { register, formState },
    submit,
    cancel,
    toggleEdit,
    isEdit,
  } = useDeliveryInstructionsForm({
    defaultValues: '',
  });

  const data = isEdit ? (
    <ShippingDeliveryInstructionsForm
      instructions={deliveryInstructions}
      register={register}
    />
  ) : (
    <ShippingDeliveryInstructionsContent
      instructions={deliveryInstructions}
      toggleEdit={toggleEdit}
    />
  );

  return (
    <Container as='div' flex='col'>
      <ShippingDeliveryInstructionsHeading
        submit={submit}
        cancel={cancel}
        toggleEdit={toggleEdit}
        isEdit={isEdit}
        formState={formState}
      />

      {data}
    </Container>
  );
};
