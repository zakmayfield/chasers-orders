import { merge } from '@/shared/utils/ui';

type TContentWrapperProps = {
  children: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'content';
  padding?: 'sm' | 'md' | 'lg';
  paddingX?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'center' | 'right';
  flex?: 'row' | 'col';
  gap?: 'sm' | 'md' | 'lg';
  flexCenter?: boolean;
};

export const ContentWrapper = (props: TContentWrapperProps) => {
  const { children, className } = props;
  const { width, padding, paddingX, margin, position, flex, gap, flexCenter } =
    useContentWrapperClasses({
      ...props,
    });

  return (
    <div
      className={merge(
        `${width} 
        ${padding} 
        ${paddingX} 
        ${margin} 
        ${position} 
        ${flex} 
        ${gap} 
        ${flexCenter} 
        ${className}`
      )}
    >
      {children}
    </div>
  );
};

export const useContentWrapperClasses = (props: TContentWrapperProps) => {
  const {
    width = 'full',
    padding = 'none',
    paddingX = 'none',
    margin = 'none',
    flex = 'col',
    gap = 'md',
    position = 'left',
    flexCenter = false,
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

  const paddingXMap = {
    none: '',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
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

  const flexMap = {
    row: 'flex gap-3',
    col: 'flex flex-col gap-3',
  };

  const gapMap = {
    sm: 'gap-1',
    md: 'gap-3',
    lg: 'gap-6',
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
  };

  return classMap;
};
