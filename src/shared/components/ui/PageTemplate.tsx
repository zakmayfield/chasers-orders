import { Container, ContainerProps } from './Container';
import { Heading } from './Heading';

export const PageTemplate = ({
  title,
  children,
  className,
  width,
  center,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  width?: ContainerProps['width'];
  center?: ContainerProps['center'];
}) => {
  return (
    <Container
      as='div'
      flex='col'
      padding='lg'
      width={width}
      center={center}
      className={className}
    >
      {title && <Heading as='h1' content={title} />}
      {children}
    </Container>
  );
};
