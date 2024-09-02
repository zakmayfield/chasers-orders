import { Container, ContainerProps } from './Container';
import { Heading } from './Heading';

export const PageTemplate = ({
  title,
  children,
  className,
  width,
  center,
  headingAs = 'h1',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  width?: ContainerProps['width'];
  center?: ContainerProps['center'];
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) => {
  return (
    <Container
      as='div'
      flex='col'
      width={width}
      center={center}
      className={className}
    >
      {title && <Heading as={headingAs} content={title} />}
      {children}
    </Container>
  );
};
