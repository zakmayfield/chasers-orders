import { FC } from 'react';
import { LoadingItem } from '../LoadingItem';

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
