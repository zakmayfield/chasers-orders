import { FC } from 'react';

interface InstructionsNotFoundProps {
  toggleEdit: () => void;
}

export const InstructionsNotFound: FC<InstructionsNotFoundProps> = ({
  toggleEdit,
}) => {
  return (
    <div className='min-h-[6rem]'>
      <button onClick={toggleEdit} className='underline text-purple-800'>
        add instructions
      </button>
    </div>
  );
};
