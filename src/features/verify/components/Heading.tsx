import { merge } from '@/utils/styles';
import { FC } from 'react';

interface HeadingProps {
  className?: string;
}

export const Heading: FC<HeadingProps> = ({ className }) => {
  return (
    <h6 className={merge(`mb-6 border-b pb-3 ${className}`)}>
      Email verification:
    </h6>
  );
};
