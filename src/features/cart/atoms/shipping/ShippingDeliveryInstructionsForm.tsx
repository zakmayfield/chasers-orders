import { ContentWrapper } from '@/shared/components/containers';
import { UseFormRegister } from 'react-hook-form';

export const ShippingDeliveryInstructionsForm = ({
  instructions,
  register,
}: {
  instructions: string;
  register: UseFormRegister<{
    deliveryInstructions: string;
  }>;
}) => {
  return (
    <ContentWrapper>
      <form>
        <label htmlFor='deliveryInstructions' className='hidden'>
          Delivery Instructions:
        </label>
        <textarea
          placeholder={instructions || 'Deliver to the back door...'}
          {...register('deliveryInstructions')}
          className='w-full border rounded-md p-4 bg-white'
        />
      </form>
    </ContentWrapper>
  );
};
