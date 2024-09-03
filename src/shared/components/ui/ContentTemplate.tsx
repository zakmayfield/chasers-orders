import { Container, ContainerProps, Heading } from '@/shared/components/ui';

export const ContentTemplate = ({
  children,
  title,
  headingAs = 'h2',
  width,
  padding,
  center,
  className,
  headingClassname,
  headingUnderline,
}: {
  children: React.ReactNode;
  title?: string;
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  width?: ContainerProps['width'];
  padding?: ContainerProps['padding'];
  center?: boolean;
  className?: string;
  headingClassname?: string;
  headingUnderline?: boolean;
}) => {
  return (
    <Container
      as='div'
      flex='col'
      width={width}
      padding={padding}
      center={center}
      className={className}
    >
      {title && (
        <Heading
          as={headingAs}
          content={title}
          className={`${headingClassname || ''} ${headingUnderline ? 'border-b' : ''}`}
        />
      )}
      {children}
    </Container>
  );
};
