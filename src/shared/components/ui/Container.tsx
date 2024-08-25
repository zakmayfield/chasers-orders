import { merge } from '@/utils/styles';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Div = ({ children, className }: Props) => {
  return <div className={merge(`${className}`)}>{children}</div>;
};
const P = ({ children, className }: Props) => {
  return <p className={merge(`${className}`)}>{children}</p>;
};
const Span = ({ children, className }: Props) => {
  return <span className={merge(`${className}`)}>{children}</span>;
};
const Loader = ({ children, className }: Props) => {
  return <div className={merge(`${className}`)}>{children}</div>;
};

export type ContainerProps = {
  as: 'div' | 'p' | 'span' | 'loader';
  children?: React.ReactNode;
  className?: string;
  flex?: 'row' | 'col';
  flexCenter?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
  center?: boolean;
  rounded?: 'sm' | 'md' | 'lg';
  width?: 'sm' | 'md' | 'lg' | 'full';
  animateColor?: 'dark' | 'darker' | 'darkest';
  border?: boolean;
};

export const Container = ({
  as = 'div',
  children,
  className,
  flex,
  flexCenter,
  padding,
  margin,
  center,
  width,
  animateColor,
  rounded,
  border,
}: ContainerProps) => {
  switch (as) {
    case 'div':
      return (
        <Div
          className={`
            ${flex === 'row' ? 'flex items-center gap-3' : flex === 'col' ? 'flex flex-col gap-3' : 'block'} 
            ${flexCenter && 'items-center justify-center'} 
            ${padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'p-0'}
            ${margin === 'sm' ? 'm-2' : margin === 'md' ? 'm-4' : margin === 'lg' ? 'm-6' : 'm-0'}
            ${center && 'mx-auto'}
            ${width === 'sm' ? 'max-w-sm w-full' : width === 'md' ? 'max-w-xl w-full' : width === 'lg' ? 'max-w-4xl w-full' : width === 'full' ? 'max-w-full w-full' : ''}
            ${rounded === 'sm' ? 'rounded-md' : rounded === 'md' ? 'rounded-xl' : rounded === 'lg' ? 'rounded-3xl' : 'rounded-none'}
            ${border && 'border'}
            ${className}
            `}
        >
          {children}
        </Div>
      );

    case 'p':
      return (
        <P
          className={`
            ${flex === 'row' ? 'flex items-center gap-3' : flex === 'col' ? 'flex flex-col gap-3' : 'block'} 
            ${flexCenter && 'items-center justify-center'} 
            ${padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'p-0'}
            ${margin === 'sm' ? 'm-2' : margin === 'md' ? 'm-4' : margin === 'lg' ? 'm-6' : 'm-0'}
            ${center && 'mx-auto'}
            ${width === 'sm' ? 'max-w-sm w-full' : width === 'md' ? 'max-w-xl w-full' : width === 'lg' ? 'max-w-4xl w-full' : width === 'full' ? 'max-w-full w-full' : ''}
            ${rounded === 'sm' ? 'rounded-md' : rounded === 'md' ? 'rounded-xl' : rounded === 'lg' ? 'rounded-3xl' : 'rounded-none'}
            ${border && 'border'}
            ${className}
            `}
        >
          {children}
        </P>
      );

    case 'span':
      return (
        <Span
          className={`
            ${flex === 'row' ? 'flex items-center gap-3' : flex === 'col' ? 'flex flex-col gap-3' : 'inline'} 
            ${flexCenter && 'items-center justify-center'} 
            ${padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'p-0'}
            ${margin === 'sm' ? 'm-2' : margin === 'md' ? 'm-4' : margin === 'lg' ? 'm-6' : 'm-0'}
            ${center && 'mx-auto'}
            ${width === 'sm' ? 'max-w-sm w-full' : width === 'md' ? 'max-w-xl w-full' : width === 'lg' ? 'max-w-4xl w-full' : width === 'full' ? 'max-w-full w-full' : ''}
            ${rounded === 'sm' ? 'rounded-md' : rounded === 'md' ? 'rounded-xl' : rounded === 'lg' ? 'rounded-3xl' : 'rounded-none'}
            ${border && 'border'}
            ${className}
            `}
        >
          {children}
        </Span>
      );

    case 'loader':
      return (
        <Loader
          className={`
            animate-pulse 
            ${flex === 'row' ? 'flex items-center gap-3' : flex === 'col' ? 'flex flex-col gap-3' : 'block'} 
            ${flexCenter && 'items-center justify-center'} 
            ${padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'p-0'}
            ${margin === 'sm' ? 'm-2' : margin === 'md' ? 'm-4' : margin === 'lg' ? 'm-6' : 'm-0'}
            ${center && 'mx-auto'}
            ${width === 'sm' ? 'max-w-sm w-full' : width === 'md' ? 'max-w-xl w-full' : width === 'lg' ? 'max-w-4xl w-full' : width === 'full' ? 'max-w-full w-full' : ''}
            ${animateColor === 'dark' ? 'bg-slate-100' : animateColor === 'darker' ? 'bg-slate-200' : animateColor === 'darkest' ? 'bg-slate-300' : 'bg-slate-100'}
            ${rounded === 'sm' ? 'rounded-md' : rounded === 'md' ? 'rounded-xl' : rounded === 'lg' ? 'rounded-3xl' : 'rounded-md'}
            ${border && 'border'}
            ${className}
            `}
        >
          {children}
        </Loader>
      );
  }
};
