import { SignIn } from '@/app/(auth)/sign-in/SignIn';
import { getAuthSession } from '@/lib/auth/auth.options';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  const user = session?.user;

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      <SignIn />
    </div>
  );
}
