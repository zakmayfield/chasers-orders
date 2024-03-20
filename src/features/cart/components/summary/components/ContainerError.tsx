import { Dispatch, FC, SetStateAction } from 'react';
import { ContainerHeader } from './ContainerHeader';
import { CiWarning } from 'react-icons/ci';

interface ContainerErrorProps {
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

export const ContainerError: FC<ContainerErrorProps> = ({ setExpanded }) => {
  return (
    <div className='mt-6'>
      <ContainerHeader setExpanded={setExpanded} />

      <p className=' flex items-center gap-3 font-extralight'>
        Could not locate shipping information{' '}
        <span className='text-yellow-600 text-xl'>
          <CiWarning />
        </span>
      </p>
    </div>
  );
};
