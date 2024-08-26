import { merge } from '@/shared/utils/ui';

type Children = React.ReactNode;
type Props = {
  children: Children;
  className?: string;
};

const H1 = ({ children, className }: Props) => {
  return <h1 className={merge(`${className}`)}>{children}</h1>;
};
const H2 = ({ children, className }: Props) => {
  return <h2 className={merge(`${className}`)}>{children}</h2>;
};
const H3 = ({ children, className }: Props) => {
  return <h3 className={merge(`${className}`)}>{children}</h3>;
};
const H4 = ({ children, className }: Props) => {
  return <h4 className={merge(`${className}`)}>{children}</h4>;
};
const H5 = ({ children, className }: Props) => {
  return <h5 className={merge(`${className}`)}>{children}</h5>;
};
const H6 = ({ children, className }: Props) => {
  return <h6 className={merge(`${className}`)}>{children}</h6>;
};

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  content: string;
  className?: string;
};

export const Heading = ({ as = 'h1', content, className }: HeadingProps) => {
  switch (as) {
    case 'h1':
      return <H1 className={className}>{content}</H1>;
    case 'h2':
      return <H2 className={className}>{content}</H2>;
    case 'h3':
      return <H3 className={className}>{content}</H3>;
    case 'h4':
      return <H4 className={className}>{content}</H4>;
    case 'h5':
      return <H5 className={className}>{content}</H5>;
    case 'h6':
      return <H6 className={className}>{content}</H6>;
  }
};
