import { merge } from '@/shared/utils/ui';
import { SpinnerIcon } from '@/shared/utils/ui';

export const SpinLoader = ({
  className,
  size,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  return (
    <SpinnerIcon
      className={merge(`
       animate-spin 
        ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-xl'}
        ${className}
    `)}
    />
  );
};
