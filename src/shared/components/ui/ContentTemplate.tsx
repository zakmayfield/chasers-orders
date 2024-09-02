import { Container, ContainerProps, Heading } from '@/shared/components/ui';

export const ContentTemplate = ({
  children,
  title,
  headingAs = 'h2',
  width,
  center,
  className,
  headingClassname,
}: {
  children: React.ReactNode;
  title?: string;
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  width?: ContainerProps['width'];
  center?: boolean;
  className?: string;
  headingClassname?: string;
}) => {
  return (
    <Container
      as='div'
      flex='col'
      width={width}
      center={center}
      className={className}
    >
      {title && (
        <Heading as={headingAs} content={title} className={headingClassname} />
      )}
      {children}
    </Container>
  );
};
