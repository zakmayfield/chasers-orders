'use client';
import { Container, Heading } from '@/shared/components/ui';
import { UiFeatureLayout } from '../UiFeatureLayout';
import { Btn } from '@/shared/components/ui/Btn';
import { CartIcon, StoreIcon } from '@/utils/icons';

export const Btns = () => {
  return (
    <UiFeatureLayout title='Btns' flex='col'>
      <Container as='div' flex='col'>
        <Heading as='h3' content='Size' />

        <Container as='div' flex='row' className='items-start'>
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
            size='sm'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
            size='md'
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
            size='lg'
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
            border={true}
            bgColor='green'
            isDisabled={true}
          />
          <Btn
            handleClick={() => console.info('clicked')}
            text='Place Order'
            Icon={CartIcon}
            border={true}
            bgColor='red'
            isDisabled={true}
          />
        </Container>
      </Container>
    </UiFeatureLayout>
  );
};
