import { FC } from 'react';

interface FavoritesLoadingSkeletonProps {}

const FavoritesLoadingSkeleton: FC<FavoritesLoadingSkeletonProps> = ({}) => {
  return (
    <div className='w-full flex flex-col gap-6'>
      {[1, 2, 3].map((item) => (
        <div className='w-full flex items-center gap-3'>
          <div className='bg-light-secondary/70 animate-pulse w-12 h-12 rounded-lg'></div>
          <div className='bg-light-secondary/70 animate-pulse w-72 h-12 rounded-lg'></div>
          <div className='bg-light-secondary/70 animate-pulse w-36 h-12 rounded-lg'></div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesLoadingSkeleton;
