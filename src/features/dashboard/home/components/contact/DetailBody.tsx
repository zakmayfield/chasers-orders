import { DashboardUserData } from '@/types/types.dashboard';
import { Dispatch, FC, SetStateAction } from 'react';

interface DetailBodyProps {
  userData: DashboardUserData;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const DetailBody: FC<DetailBodyProps> = ({ userData, setIsEdit }) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <span className='col-span-3 text-gray-700 flex items-center h-8'>
          Name:{' '}
        </span>
        <span className='col-start-5 col-span-6 flex items-center h-8'>
          {userData.contact.name}
        </span>

        <span className='row-start-2 col-span-4 text-gray-700 flex items-center h-8'>
          Phone number:{' '}
        </span>
        <span className='row-start-2 col-start-5 col-span-6 flex items-center h-8'>
          {userData.contact.phoneNumber}
        </span>

        <span className='row-start-3 col-span-4 text-gray-700 flex items-center h-8'>
          Position:{' '}
        </span>
        <span className='row-start-3 col-start-5 col-span-6 flex items-center h-8'>
          {userData.contact.position ? (
            userData.contact.position
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='underline text-purple-900'
            >
              add position
            </button>
          )}
        </span>
      </div>
    </div>
  );
};
