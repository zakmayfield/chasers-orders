import { Container } from '@/shared/components/ui';
import { useDeliveryInstructionsForm } from '@/shared/hooks/utils';
import { ShippingDeliveryInstructionsHeading } from '@/features/cart/atoms/shipping/ShippingDeliveryInstructionsHeading';
import { ShippingDeliveryInstructionsForm } from '@/features/cart/atoms/shipping/ShippingDeliveryInstructionsForm';
import { ShippingDeliveryInstructionsContent } from '@/features/cart/atoms/shipping/ShippingDeliveryInstructionsContent';

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
