import { SignUp } from '@/features/auth/signup';
import { getAuthSession } from '@/lib/auth/auth.options';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getAuthSession();

  const user = session?.user;

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      <SignUp />
    </div>
  );
}
