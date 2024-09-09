import { Container } from '@/shared/components/ui';
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
    <Container as='div'>
      <form>
        <textarea
          placeholder={instructions || 'Deliver to the back door...'}
          {...register('deliveryInstructions')}
          className='w-full border rounded-md p-4 bg-slate-50'
        />
      </form>
    </Container>
  );
};
