import { FC } from 'react';

interface LoadingSkellyProps {}

export const LoadingSkelly: FC<LoadingSkellyProps> = ({}) => {
  return (
    <div>
      {[1, 2].map((item) => (
        <LoadingItem key={item} />
      ))}
    </div>
  );
};

export const LoadingItem = ({}) => {
  return (
    <div className='w-full h-24 pb-3 border-b flex items-center gap-10 animate-pulse'>
      <div className='w-4 h-4 bg-slate-200 rounded'></div>

      <div>
        <div className='flex space-x-2 items-center mt-3 rounded'>
          <p className='h-4 w-48 rounded bg-slate-300'></p>
          <p className='bg-slate-200 rounded h-4 w-16'></p>
        </div>

        <div className='flex space-x-4 my-2'>
          <div className='h-4 w-20 bg-slate-200 rounded'></div>
          <div className='h-4 w-16 bg-slate-200 rounded'></div>
        </div>
      </div>
    </div>
  );
};
