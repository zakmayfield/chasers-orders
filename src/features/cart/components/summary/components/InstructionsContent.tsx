import { FC } from 'react';

interface InstructionsContentProps {
  deliveryInstructions: string;
}

export const InstructionsContent: FC<InstructionsContentProps> = ({
  deliveryInstructions,
}) => {
  return <p className='p-3 min-h-[5rem] border-t'>{deliveryInstructions}</p>;
};
