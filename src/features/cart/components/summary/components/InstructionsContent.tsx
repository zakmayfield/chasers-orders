import { FC } from 'react';

interface InstructionsContentProps {
  deliveryInstructions: string;
}

export const InstructionsContent: FC<InstructionsContentProps> = ({
  deliveryInstructions,
}) => {
  return <p className='py-3 min-h-[6rem]'>{deliveryInstructions}</p>;
};
