import { Container } from '@/shared/components/ui';

export const ShippingDeliveryInstructionsContent = ({
  instructions,
  toggleEdit,
}: {
  instructions: string;
  toggleEdit: () => void;
}) => {
  const hasInstructions = !!instructions;
  const content = hasInstructions ? (
    <Container as='p'>{instructions}</Container>
  ) : (
    <Container as='p' flex='row' flexCenter={true} padding='sm'>
      <button onClick={toggleEdit} className='underline text-blue-800'>
        Add special instructions
      </button>
    </Container>
  );

  return (
    <Container as='div' padding='md' className='bg-slate-50'>
      {content}
    </Container>
  );
};
