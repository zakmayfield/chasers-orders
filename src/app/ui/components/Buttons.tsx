'use client';
import { BackButton, SendVerificationEmail } from '@/shared/components/buttons';
import { Button } from '@/shared/components/ui';
import { TrashIcon } from '@/utils/icons';

export const Buttons = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Buttons</h1>

      <div className='flex flex-col gap-3'>
        <Button
          text='Custom'
          Icon={TrashIcon}
          padding='sm'
          textColor='white'
          rounded='md'
          width='sm'
          handleClick={() => console.log('clicked')}
        />
        <Button
          text='Custom'
          padding='sm'
          textColor='white'
          rounded='md'
          width='sm'
          handleClick={() => console.log('clicked')}
        />
        <Button
          text='Custom'
          padding='sm'
          textColor='white'
          bg='translucent'
          rounded='md'
          width='lg'
          isLoading={true}
          handleClick={() => console.log('clicked')}
        />
      </div>
    </div>
  );
};
