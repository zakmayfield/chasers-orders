import { FC } from 'react';

interface InstructionsNotFoundProps {
  toggleEdit: () => void;
}

export const InstructionsNotFound: FC<InstructionsNotFoundProps> = ({
  toggleEdit,
}) => {
  return (
    <div className='p-3 min-h-[5rem] bg-light-primary rounded-lg'>
      <button onClick={toggleEdit} className='underline text-purple-800'>
        add delivery instructions
      </button>
    </div>
  );
};
