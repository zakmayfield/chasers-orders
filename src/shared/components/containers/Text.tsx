import { merge } from '@/shared/utils/ui';

type TTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span';
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'center' | 'right';
};

export const Text = (props: TTextProps) => {
  const { children, as = 'p', className = '' } = props;
  const { width, padding, margin, position } = useTextClasses({ ...props });

  switch (as) {
    case 'p':
      return (
        <p
          className={merge(
            `${width} ${padding} ${margin} ${position} ${className}`
          )}
        >
          {children}
        </p>
      );
    case 'span':
      return (
        <span
          className={merge(
            `${width} ${padding} ${margin} ${position} ${className}`
          )}
        >
          {children}
        </span>
      );
  }
};

export const useTextClasses = (props: TTextProps) => {
  const {
    width = 'none',
    padding = 'none',
    margin = 'none',
    position = 'none',
  } = props;

  const widthMap = {
    none: '',
    auto: 'w-auto',
    sm: 'max-w-sm w-full',
    md: 'max-w-lg w-full',
    lg: 'max-w-2xl w-full',
    full: 'w-full',
  };

  const paddingMap = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const marginMap = {
    none: '',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
  };

  const positionMap = {
    none: '',
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  const classMap = {
    width: widthMap[width],
    padding: paddingMap[padding],
    margin: marginMap[margin],
    position: positionMap[position],
  };

  return classMap;
};
