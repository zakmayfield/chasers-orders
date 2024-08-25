import { Container, Heading } from '@/shared/components/ui';

export const UiFeatureLayout = ({
  title,
  children,
  flex,
}: {
  title: string;
  children: React.ReactNode;
  flex?: 'row' | 'col';
}) => {
  return (
    <Container as='div' flex={flex}>
      <Heading as='h1' content={title} className='border-b' />

      <Container as='div' flex='col'>
        {children}
      </Container>
    </Container>
  );
};
