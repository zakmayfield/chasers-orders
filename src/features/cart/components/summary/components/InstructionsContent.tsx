import { FC } from 'react';

interface InstructionsContentProps {
  deliveryInstructions: string;
}

export const InstructionsContent: FC<InstructionsContentProps> = ({
  deliveryInstructions,
}) => {
  return (
    <p className='p-3 min-h-[5rem] bg-light-primary rounded-lg'>
      {deliveryInstructions}
    </p>
  );
};
