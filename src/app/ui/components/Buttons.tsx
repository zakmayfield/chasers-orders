'use client';
import { Button, Container } from '@/shared/components/ui';
import { CartIcon, TrashIcon } from '@/utils/icons';

export const Buttons = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Buttons</h1>

      <div className='flex flex-col gap-3'>
        <Container as='div' flex='row'>
          <Button
            text='Custom'
            Icon={TrashIcon}
            padding='sm'
            textColor='white'
            rounded='md'
            width='sm'
            handleClick={() => console.info('clicked')}
          />
          <Button
            text='Custom'
            padding='sm'
            textColor='white'
            rounded='md'
            width='sm'
            handleClick={() => console.info('clicked')}
          />
        </Container>

        <Container as='div' flex='row'>
          <Button
            text='Custom'
            padding='sm'
            textColor='white'
            bg='translucent'
            rounded='md'
            width='lg'
            isLoading={true}
            handleClick={() => console.info('clicked')}
          />
          <Button
            padding='sm'
            textColor='white'
            bg='translucent'
            rounded='md'
            width='lg'
            isLoading={true}
            handleClick={() => console.info('clicked')}
          />
          <Button
            padding='sm'
            textColor='white'
            bg='translucent'
            rounded='md'
            width='lg'
            Icon={CartIcon}
            handleClick={() => console.info('clicked')}
          />
        </Container>
      </div>
    </div>
  );
};
