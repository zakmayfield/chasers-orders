type Children = React.ReactNode;

const H1 = ({ children }: { children: Children }) => {
  return <h1>{children}</h1>;
};
const H2 = ({ children }: { children: Children }) => {
  return <h2>{children}</h2>;
};
const H3 = ({ children }: { children: Children }) => {
  return <h3>{children}</h3>;
};
const H4 = ({ children }: { children: Children }) => {
  return <h4>{children}</h4>;
};
const H5 = ({ children }: { children: Children }) => {
  return <h5>{children}</h5>;
};
const H6 = ({ children }: { children: Children }) => {
  return <h6>{children}</h6>;
};

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  content: string;
};

export const Heading = ({ as = 'h1', content }: HeadingProps) => {
  switch (as) {
    case 'h1':
      return <H1>{content}</H1>;
    case 'h2':
      return <H2>{content}</H2>;
    case 'h3':
      return <H3>{content}</H3>;
    case 'h4':
      return <H4>{content}</H4>;
    case 'h5':
      return <H5>{content}</H5>;
    case 'h6':
      return <H6>{content}</H6>;
  }
};
