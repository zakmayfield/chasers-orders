import { merge } from '@/shared/utils/ui';
import { Heading } from '../ui';

type TLayoutProps = {
  children: React.ReactNode;
  className?: string;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title?: string;
  width?: 'sm' | 'md' | 'lg' | 'content';
  padding?: 'sm' | 'md' | 'lg';
  contentClassname?: string;
  contentPadding?: 'sm' | 'md' | 'lg';
};

export const Layout = (props: TLayoutProps) => {
  const { children, className, contentClassname, heading, title } = props;
  const { width, padding, contentPadding } = useLayoutClasses({ ...props });

  return (
    <div
      className={merge(`flex flex-col gap-3 ${width} ${padding} ${className}`)}
    >
      {heading && <Heading as={heading} content={title || ''} />}
      <div className={merge(`${contentPadding} ${contentClassname}`)}>
        {children}
      </div>
    </div>
  );
};

export const useLayoutClasses = (props: TLayoutProps) => {
  const { width = 'full', padding = 'none', contentPadding = 'none' } = props;

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

  const contentPaddingMap = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const classMap = {
    width: widthMap[width],
    padding: paddingMap[padding],
    contentPadding: contentPaddingMap[contentPadding],
  };

  return classMap;
};
