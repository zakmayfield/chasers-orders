import { Container, ContainerProps } from './Container';

export const PulseLoader = ({
  width,
  rows,
}: {
  width?: ContainerProps['width'];
  rows?: 'multi';
}) => {
  return (
    <Container
      as='loader'
      padding='md'
      animateColor='dark'
      width={width ? width : 'sm'}
      flex='col'
    >
      <Container as='div' flex='row'>
        <Container as='loader' animateColor='darkest' padding='md' />
        <Container
          as='loader'
          animateColor='darker'
          padding='md'
          width='full'
        />
      </Container>

      {rows === 'multi' && (
        <Container as='div' flex='row'>
          <Container
            as='loader'
            animateColor='darker'
            padding='md'
            className='flex-1'
          />
          <Container
            as='loader'
            animateColor='darkest'
            padding='md'
            className='flex-1'
          />
        </Container>
      )}
    </Container>
  );
};
