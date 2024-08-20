import { BackButton, SendVerificationEmail } from '@/shared/components/buttons';

export const Buttons = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Buttons</h1>

      <div className='flex flex-col gap-3'>
        <BackButton />
        <SendVerificationEmail />
      </div>
    </div>
  );
};
