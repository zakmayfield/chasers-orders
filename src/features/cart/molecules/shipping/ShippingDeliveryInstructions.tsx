import { useDeliveryInstructionsForm } from '@/shared/hooks/utils';
import { ShippingDeliveryInstructionsHeading } from '@/features/cart/atoms/shipping/ShippingDeliveryInstructionsHeading';
import { ShippingDeliveryInstructionsForm } from '@/features/cart/atoms/shipping/ShippingDeliveryInstructionsForm';
import { ShippingDeliveryInstructionsContent } from '@/features/cart/atoms/shipping/ShippingDeliveryInstructionsContent';
import { ContentWrapper } from '@/shared/components/containers';
import { TCompanyWithAddress } from '@/shared/types/User';

export const ShippingDeliveryInstructions = ({
  company,
}: {
  company: TCompanyWithAddress;
}) => {
  const {
    methods: { register, formState },
    submit,
    cancel,
    toggleEdit,
    isEdit,
  } = useDeliveryInstructionsForm({
    defaultValues: company.shipping!.deliveryInstructions || '',
    company_id: company.company_id,
  });

  const data = isEdit ? (
    <ShippingDeliveryInstructionsForm
      instructions={company.shipping?.deliveryInstructions || ''}
      register={register}
    />
  ) : (
    <ShippingDeliveryInstructionsContent
      instructions={company.shipping?.deliveryInstructions || ''}
      toggleEdit={toggleEdit}
    />
  );

  return (
    <ContentWrapper flex='col'>
      <ShippingDeliveryInstructionsHeading
        submit={submit}
        cancel={cancel}
        toggleEdit={toggleEdit}
        isEdit={isEdit}
        formState={formState}
      />

      {data}
    </ContentWrapper>
  );
};
