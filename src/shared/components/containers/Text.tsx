import { merge } from '@/shared/utils/ui';

type TTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span';
  width?: 'content' | 'sm' | 'md' | 'lg' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'center' | 'right';
};

export const Text = (props: TTextProps) => {
  const { children, as = 'p', className } = props;
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
    width = 'full',
    padding = 'none',
    margin = 'none',
    position = 'left',
  } = props;

  const widthMap = {
    content: 'max-w-min w-full',
    sm: 'max-w-sm w-full',
    md: 'max-w-lg w-full',
    lg: 'max-w-2xl w-full',
    full: 'w-full',
  };

  const paddingMap = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const marginMap = {
    none: 'm-0',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
  };

  const positionMap = {
    left: 'mr-auto',
    center: 'm-auto',
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
