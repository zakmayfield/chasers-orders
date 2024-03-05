import { SignUp } from '@/features/auth/signup';

export default function Page() {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <SignUp />
    </div>
  );
}
