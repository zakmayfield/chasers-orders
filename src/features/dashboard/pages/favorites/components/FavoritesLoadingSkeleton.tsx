import { FC } from 'react';

interface FavoritesLoadingSkeletonProps {}

const FavoritesLoadingSkeleton: FC<FavoritesLoadingSkeletonProps> = ({}) => {
  return (
    <div className='w-full flex flex-col'>
      {[1, 2, 3].map((item) => (
        <div key={item} className='w-full h-16 flex items-center gap-3'>
          <div className='bg-light-secondary/70 animate-pulse w-12 h-12 rounded-lg'></div>
          <div className='bg-light-tertiary/30 animate-pulse w-72 h-12 rounded-lg'></div>
          <div className='bg-light-secondary/70 animate-pulse w-36 h-12 rounded-lg'></div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesLoadingSkeleton;
