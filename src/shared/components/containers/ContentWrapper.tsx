import { merge } from '@/shared/utils/ui';

type TContentWrapperProps = {
  children: React.ReactNode;
  className?: string;
  width?: 'auto' | 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  paddingX?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'center' | 'right';
  flex?: 'row' | 'col';
  gap?: 'sm' | 'md' | 'lg';
  flexCenter?: boolean;
  rounded?: 'sm' | 'md' | 'lg';
};

export const ContentWrapper = (props: TContentWrapperProps) => {
  const { children, className = '' } = props;

  const {
    width,
    padding,
    paddingX,
    margin,
    position,
    flex,
    gap,
    flexCenter,
    rounded,
  } = useContentWrapperClasses({
    ...props,
  });

  return (
    <div
      className={merge(
        `${padding} 
        ${paddingX} 
        ${margin} 
        ${position} 
        ${flex} 
        ${gap} 
        ${flexCenter} 
        ${rounded}
        ${width} 
        ${className}`
      )}
    >
      {children}
    </div>
  );
};

export const useContentWrapperClasses = (props: TContentWrapperProps) => {
  const {
    width = 'none',
    padding = 'none',
    paddingX = 'none',
    margin = 'none',
    flex = 'none',
    gap = 'md',
    position = 'none',
    flexCenter = false,
    rounded = 'none',
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

  const paddingXMap = {
    none: '',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
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

  const flexMap = {
    none: '',
    row: 'flex gap-3 items-center',
    col: 'flex flex-col gap-3',
  };

  const gapMap = {
    sm: 'gap-1',
    md: 'gap-3',
    lg: 'gap-6',
  };

  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };

  const flexCenterMap = flexCenter ? 'items-center justify-center' : '';

  const classMap = {
    width: widthMap[width],
    padding: paddingMap[padding],
    paddingX: paddingXMap[paddingX],
    margin: marginMap[margin],
    position: positionMap[position],
    flex: flexMap[flex],
    gap: gapMap[gap],
    flexCenter: flexCenterMap,
    rounded: roundedMap[rounded],
  };

  return classMap;
};
