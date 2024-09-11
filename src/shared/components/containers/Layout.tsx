import { merge } from '@/shared/utils/ui';
import { Heading } from '../ui';

type TLayoutProps = {
  children: React.ReactNode;
  className?: string;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title?: string;
  headingClassName?: string;
  width?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'center' | 'right';
  contentClassname?: string;
  contentPadding?: 'sm' | 'md' | 'lg';
  contentFlex?: 'row' | 'col';
  contentRounded?: 'sm' | 'md' | 'lg';
};

export const Layout = (props: TLayoutProps) => {
  const {
    children,
    className = '',
    contentClassname = '',
    heading,
    title = '',
    headingClassName = '',
  } = props;

  const {
    width,
    padding,
    position,
    contentPadding,
    contentFlex,
    contentRounded,
  } = useLayoutClasses({
    ...props,
  });

  return (
    <div
      className={merge(
        `flex flex-col gap-3 ${width} ${padding} ${position} ${className}`
      )}
    >
      {heading && (
        <Heading as={heading} content={title} className={headingClassName} />
      )}
      <div
        className={merge(
          `${contentPadding} ${contentFlex} ${contentRounded} ${contentClassname}`
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const useLayoutClasses = (props: TLayoutProps) => {
  const {
    width = 'full',
    padding = 'none',
    position = 'center',
    contentPadding = 'none',
    contentFlex = 'none',
    contentRounded = 'none',
  } = props;

  const widthMap = {
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

  const positionMap = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  const contentPaddingMap = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const contentFlexMap = {
    none: '',
    row: 'flex gap-3',
    col: 'flex flex-col gap-3',
  };

  const contentRoundedMap = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };

  const classMap = {
    width: widthMap[width],
    padding: paddingMap[padding],
    position: positionMap[position],
    contentPadding: contentPaddingMap[contentPadding],
    contentFlex: contentFlexMap[contentFlex],
    contentRounded: contentRoundedMap[contentRounded],
  };

  return classMap;
};
