import { Container } from '@/shared/components/ui';

export const Containers = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Containers</h1>

      <div className='flex flex-col gap-6'>
        {/* Container Types */}
        <Container as='div' flex='row'>
          <div className='w-full'>
            <h3>Div</h3>
            <Container as='div' border={true}>
              A1
            </Container>
            <Container as='div' border={true}>
              A2
            </Container>
          </div>
          <div className='w-48'>
            <h3>P</h3>
            <Container as='p' border={true}>
              B1
            </Container>
            <Container as='p' border={true}>
              B2
            </Container>
          </div>
          <div>
            <h3>Span</h3>
            <Container as='span' border={true}>
              C1
            </Container>
            <Container as='span' border={true}>
              C2
            </Container>
          </div>
        </Container>

        {/* Flexbox */}
        <Container as='div' flex='row'>
          <div className='w-1/2'>
            <h3>Flex Row</h3>
            <Container as='div' flex='row' border={true}>
              <div>A</div>
              <div>B</div>
              <div>C</div>
            </Container>
          </div>

          <div className='w-1/2'>
            <h3>Flex Col</h3>
            <Container as='div' flex='col' border={true}>
              <div>A</div>
              <div>B</div>
              <div>C</div>
            </Container>
          </div>
        </Container>

        {/* Spacing */}
        <Container as='div' flex='row'>
          <div className='w-1/2'>
            <h3>Padding</h3>
            <Container as='div' flex='col'>
              <Container as='div' border={true} padding='sm'>
                sm
              </Container>
              <Container as='div' border={true} padding='md'>
                md
              </Container>
              <Container as='div' border={true} padding='lg'>
                lg
              </Container>
            </Container>
          </div>
          <div className='w-1/2'>
            <h3>Margin</h3>
            <Container as='div' flex='col' border={true}>
              <Container as='div' border={true} margin='sm'>
                sm
              </Container>
              <Container as='div' border={true} margin='md'>
                md
              </Container>
              <Container as='div' border={true} margin='lg'>
                lg
              </Container>
            </Container>
          </div>
        </Container>

        {/* Border */}
        <Container as='div'>
          <h3>Border Radius</h3>
          <Container as='div' flex='row'>
            <Container
              as='div'
              border={true}
              rounded='sm'
              padding='lg'
              className='flex-1'
            >
              Rounded: sm
            </Container>
            <Container
              as='div'
              border={true}
              rounded='md'
              padding='lg'
              className='flex-1'
            >
              Rounded: md
            </Container>
            <Container
              as='div'
              border={true}
              rounded='lg'
              padding='lg'
              className='flex-1'
            >
              Rounded: lg
            </Container>
          </Container>
        </Container>

        {/* Width */}
        <Container as='div'>
          <h3>Width</h3>
          <Container as='div' flex='col'>
            <Container as='div' border={true} width='sm' padding='sm'>
              sm
            </Container>
            <Container as='div' border={true} width='md' padding='sm'>
              md
            </Container>
            <Container as='div' border={true} width='lg' padding='sm'>
              lg
            </Container>
            <Container as='div' border={true} padding='sm'>
              default
            </Container>
          </Container>
        </Container>

        {/* Loader */}
        <Container as='div'>
          <h3>Loader</h3>
          <Container as='div' flex='col'>
            <Container
              as='loader'
              width='sm'
              animateColor='dark'
              className='h-12'
            />
            <Container
              as='loader'
              width='sm'
              animateColor='darker'
              className='h-12'
            />
            <Container
              as='loader'
              width='sm'
              animateColor='darkest'
              className='h-12'
            />
            <Container
              as='loader'
              flex='col'
              width='sm'
              animateColor='dark'
              padding='lg'
            >
              <Container as='div' flex='row'>
                <Container
                  as='loader'
                  className='h-6 flex-1'
                  animateColor='darker'
                />
                <Container
                  as='loader'
                  className='h-6 flex-1'
                  animateColor='darker'
                />
                <Container
                  as='loader'
                  className='h-6 flex-1'
                  animateColor='darker'
                />
              </Container>
              <Container
                as='loader'
                className='h-6 w-full'
                animateColor='darkest'
              />
            </Container>
          </Container>
        </Container>
      </div>
    </div>
  );
};
