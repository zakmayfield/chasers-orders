'use client';
import { Container, Heading } from '@/shared/components/ui';
import { UiFeatureLayout } from '../UiFeatureLayout';
import { Btn } from '@/shared/components/ui/Btn';
import { CartIcon, StoreIcon } from '@/shared/utils/ui';

export const Btns = () => {
  return (
    <UiFeatureLayout title='Btns' flex='col'>
      <Container as='div' flex='col'>
        <Heading as='h3' content='Size' />

        <Container as='div' flex='row' className='items-start'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Small'
            Icon={CartIcon}
            border={true}
            height='sm'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Medium (default)'
            Icon={CartIcon}
            border={true}
            height='md'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Large'
            Icon={CartIcon}
            border={true}
            height='lg'
          />
        </Container>
      </Container>

      <Container as='div' flex='col'>
        <Heading as='h3' content='Width' />

        <Container as='div' flex='row' className='items-start'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Auto'
            Icon={CartIcon}
            border={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Small'
            Icon={CartIcon}
            border={true}
            width='sm'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Medium'
            Icon={CartIcon}
            border={true}
            width='md'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Large'
            Icon={CartIcon}
            border={true}
            width='lg'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Full'
            Icon={CartIcon}
            border={true}
            width='full'
          />
        </Container>
      </Container>

      <Container as='div' flex='col'>
        <Heading as='h3' content='Icon' />

        <Container as='div' flex='row'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            Icon={CartIcon}
            border={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            Icon={StoreIcon}
            border={true}
          />
        </Container>
      </Container>

      <Container as='div' flex='col'>
        <Heading as='h3' content='Color' />

        <Container as='div' flex='row'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            bgColor='green'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            bgColor='red'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            Icon={CartIcon}
            bgColor='green'
          />
        </Container>
      </Container>

      <Container as='div' flex='col'>
        <Heading as='h3' content='Disabled' />

        <Container as='div' flex='row'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
            isDisabled={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            bgColor='green'
            isDisabled={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            bgColor='red'
            isDisabled={true}
          />
        </Container>
      </Container>

      <Container as='div' flex='col'>
        <Heading as='h3' content='Loading (needs width property)' />

        <Container as='div' flex='row'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
            isLoading={true}
            isDisabled={true}
            width='sm'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            bgColor='green'
            isLoading={true}
            isDisabled={true}
            width='lg'
          />
        </Container>
      </Container>
    </UiFeatureLayout>
  );
};
