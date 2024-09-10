import { ContentWrapper, Text } from '@/shared/components/containers';

export const ShippingDeliveryInstructionsContent = ({
  instructions,
  toggleEdit,
}: {
  instructions: string;
  toggleEdit: () => void;
}) => {
  const hasInstructions = !!instructions;

  const content = hasInstructions ? (
    <Text>{instructions}</Text>
  ) : (
    <Text padding='sm' className='flex items-center justify-center'>
      <button onClick={toggleEdit} className='underline text-blue-800'>
        Add special instructions
      </button>
    </Text>
  );

  return (
    <ContentWrapper padding='md' rounded='lg' className='bg-slate-100'>
      {content}
    </ContentWrapper>
  );
};
